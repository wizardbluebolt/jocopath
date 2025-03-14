module "authDonations" {
  source = "../../modules/authorization"
  db_table_name = "Donations"
  env_name = "${local.env_name}"
  region = "${local.region}"
  account = "${local.account}"
}

module "createDonation" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Donations"
  object_type_name = "Donation"
  operation = "create"
  http_method = "POST"
  route_path = "donation"
  route_auth_type = "JWT"
  lambda_source = "createDonation"
  auth_role_arn = module.authDonations.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "members"
}

module "pendingDonation" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Donations"
  object_type_name = "Donation"
  operation = "queryPending"
  http_method = "GET"
  route_path = "donationpending"
  route_auth_type = "JWT"
  lambda_source = "queryPendingDonation"
  auth_role_arn = module.authDonations.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "approvedDonation" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Donations"
  object_type_name = "Donation"
  operation = "queryApproved"
  http_method = "GET"
  route_path = "donation"
  route_auth_type = "NONE"
  lambda_source = "queryApprovedDonation"
  auth_role_arn = module.authDonations.role_arn
  api_gw_id = module.apigw.gw_api_id
}

module "approveDonation" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Donations"
  object_type_name = "Donation"
  operation = "approve"
  http_method = "PUT"
  route_path = "donation"
  route_auth_type = "JWT"
  lambda_source = "approveDonation"
  auth_role_arn = module.authDonations.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}

module "deleteDonation" {
  source = "../../modules/backend"
  env_name = "${local.env_name}"
  region = "${local.region}"
  db_table = "Donations"
  object_type_name = "Donation"
  operation = "delete"
  http_method = "DELETE"
  route_path = "donation"
  route_auth_type = "JWT"
  lambda_source = "deleteDonation"
  auth_role_arn = module.authDonations.role_arn
  api_gw_id = module.apigw.gw_api_id
  api_gw_auth_id = module.apigw.gw_api_auth_id
  auth_scope = "reviewers"
}