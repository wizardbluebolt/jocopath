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
  root_domain_name = "api.pathofjoco.org"
  user_pool_id = "us-west-2_J2xOMISRT"
  user_pool_client_app_id = "4rpuqofrtgqqp8ei2m8kq48jvd"
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
  region = "${local.region}"
  user_pool_id = "${local.user_pool_id}"
  user_pool_client_app_id = "${local.user_pool_client_app_id}"
}
