module "authServices" {
  source = "../../modules/authorization"
  db_table_name = "Services"
  env_name = "${local.env_name}"
  region = "${local.region}"
  account = "${local.account}"
}

module "createService" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Services"
  object_type_name = "Service"
  operation = "create"
  http_method = "POST"
  route_path = "service"
  route_auth_type = "JWT"
  lambda_source = "createService"
  auth_role_arn = module.authServices.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "members"
}

module "pendingService" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Services"
  object_type_name = "Service"
  operation = "queryPending"
  http_method = "GET"
  route_path = "servicepending"
  route_auth_type = "JWT"
  lambda_source = "queryPendingService"
  auth_role_arn = module.authServices.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "approvedService" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Services"
  object_type_name = "Service"
  operation = "queryApproved"
  http_method = "GET"
  route_path = "service"
  route_auth_type = "NONE"
  lambda_source = "queryApprovedService"
  auth_role_arn = module.authServices.role_arn
  api_gw_id = module.apigw.gw_api_id
}

module "approveService" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Services"
  object_type_name = "Service"
  operation = "approve"
  http_method = "PUT"
  route_path = "service"
  route_auth_type = "JWT"
  lambda_source = "approveService"
  auth_role_arn = module.authServices.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "deleteService" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Services"
  object_type_name = "Service"
  operation = "delete"
  http_method = "DELETE"
  route_path = "service"
  route_auth_type = "JWT"
  lambda_source = "deleteService"
  auth_role_arn = module.authServices.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}