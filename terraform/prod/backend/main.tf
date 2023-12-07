terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "=5.23.1"
      }
    }
    backend "s3" {
        bucket = "wizardbluebolt-terraform-state"
        key = "jocopath/prod/database/terraform.tfstate"
        region = "us-west-2"
        dynamodb_table = "wbbtf_pathjoco_lockid"
    }
}

data "aws_caller_identity" "current" {}

locals {
  account = data.aws_caller_identity.current.account_id
  region = "us-west-2"
  env_name = "Prod"
  root_domain_name = "pathofjoco.org"
}

provider "aws" {
  region = "${local.region}"
}

module "database" {
    source = "../../modules/database"
    env_name = "${local.env_name}"
}

module "apigw" {
  source = "../../modules/apigw"
  env_name = "${local.env_name}"
  root_domain_name = "${local.root_domain_name}"
}

module "authEvents" {
  source = "../../modules/authorization"
  db_table_name = "Events"
  env_name = "${local.env_name}"
  region = "${local.region}"
  account = "${local.account}"
}

module "createEvent" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Events"
  object_type_name = "Event"
  operation = "create"
  http_method = "POST"
  route_path = "event"
  route_auth_type = "NONE"
  lambda_source = "createEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
}

module "pendingEvent" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Events"
  object_type_name = "Event"
  operation = "queryPending"
  http_method = "GET"
  route_path = "eventpending"
  route_auth_type = "NONE"
  lambda_source = "queryPendingEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
}

module "approvedEvent" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Events"
  object_type_name = "Event"
  operation = "queryApproved"
  http_method = "GET"
  route_path = "event"
  route_auth_type = "NONE"
  lambda_source = "queryApprovedEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
}

module "approveEvent" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Events"
  object_type_name = "Event"
  operation = "approve"
  http_method = "PUT"
  route_path = "event"
  route_auth_type = "NONE"
  lambda_source = "approveEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
}