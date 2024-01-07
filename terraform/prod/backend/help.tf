module "authHelp" {
  source = "../../modules/authorization"
  db_table_name = "HelpWanted"
  env_name = "${local.env_name}"
  region = "${local.region}"
  account = "${local.account}"
}

module "createHelp" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "HelpWanted"
  object_type_name = "Help"
  operation = "create"
  http_method = "POST"
  route_path = "help"
  route_auth_type = "JWT"
  lambda_source = "createHelp"
  auth_role_arn = module.authHelp.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "members"
}

module "pendingHelp" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "HelpWanted"
  object_type_name = "Help"
  operation = "queryPending"
  http_method = "GET"
  route_path = "helppending"
  route_auth_type = "JWT"
  lambda_source = "queryPendingHelp"
  auth_role_arn = module.authHelp.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "approvedHelp" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "HelpWanted"
  object_type_name = "Help"
  operation = "queryApproved"
  http_method = "GET"
  route_path = "help"
  route_auth_type = "NONE"
  lambda_source = "queryApprovedHelp"
  auth_role_arn = module.authHelp.role_arn
  api_gw_id = module.apigw.gw_api_id
}

module "approveHelp" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "HelpWanted"
  object_type_name = "Help"
  operation = "approve"
  http_method = "PUT"
  route_path = "help"
  route_auth_type = "JWT"
  lambda_source = "approveHelp"
  auth_role_arn = module.authHelp.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "deleteHelp" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "HelpWanted"
  object_type_name = "Help"
  operation = "delete"
  http_method = "DELETE"
  route_path = "help"
  route_auth_type = "JWT"
  lambda_source = "deleteHelp"
  auth_role_arn = module.authHelp.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}