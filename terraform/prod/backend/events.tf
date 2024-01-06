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
  route_auth_type = "JWT"
  lambda_source = "createEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "members"
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
  route_auth_type = "JWT"
  lambda_source = "queryPendingEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
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
  route_auth_type = "JWT"
  lambda_source = "approveEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "deleteEvent" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Events"
  object_type_name = "Event"
  operation = "delete"
  http_method = "DELETE"
  route_path = "event"
  route_auth_type = "JWT"
  lambda_source = "deleteEvent"
  auth_role_arn = module.authEvents.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}