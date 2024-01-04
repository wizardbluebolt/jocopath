variable "env_name" {
    description = "Environment name to use as an identifier prefix."
}

variable "root_domain_name" {
    description = "Root domain name to use for backend API"
}

variable "region" {
    description = "AWS region resources are deployed to"
}

variable "user_pool_id" {
    description = "Identifier of AWS Cognito User Pool for API GW JWT Authorizer"
}

variable "user_pool_client_app_id" {
    description = "Identifier of the AWS Cognito User Pool Client Application ID for user authentication"
}