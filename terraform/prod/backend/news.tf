module "authNews" {
  source = "../../modules/authorization"
  db_table_name = "News"
  env_name = "${local.env_name}"
  region = "${local.region}"
  account = "${local.account}"
}

module "createNews" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "News"
  object_type_name = "News"
  operation = "create"
  http_method = "POST"
  route_path = "news"
  route_auth_type = "JWT"
  lambda_source = "createNews"
  auth_role_arn = module.authNews.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "members"
}

module "pendingNews" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "News"
  object_type_name = "News"
  operation = "queryPending"
  http_method = "GET"
  route_path = "newspending"
  route_auth_type = "JWT"
  lambda_source = "queryPendingNews"
  auth_role_arn = module.authNews.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "approvedNews" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "News"
  object_type_name = "News"
  operation = "queryApproved"
  http_method = "GET"
  route_path = "news"
  route_auth_type = "NONE"
  lambda_source = "queryApprovedNews"
  auth_role_arn = module.authNews.role_arn
  api_gw_id = module.apigw.gw_api_id
}

module "approveNews" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "News"
  object_type_name = "News"
  operation = "approve"
  http_method = "PUT"
  route_path = "news"
  route_auth_type = "JWT"
  lambda_source = "approveNews"
  auth_role_arn = module.authNews.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "deleteNews" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "News"
  object_type_name = "News"
  operation = "delete"
  http_method = "DELETE"
  route_path = "news"
  route_auth_type = "JWT"
  lambda_source = "deleteNews"
  auth_role_arn = module.authNews.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}