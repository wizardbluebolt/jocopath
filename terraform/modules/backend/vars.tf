variable "env_name" {
    description = "Environment name"
}

variable "region" {
    description = "Resource creation AWS region"
}

variable "db_table" {
    description = "DynamoDB table name"
}

variable "object_type_name" {
    description = "Name of the API operation object type Event/News/Help/Service"
}

variable "operation" {
    description = "API operation create/update/delete/approve/listPending/listApproved"
}

variable "http_method" {
    description = "HTTP method to use for route GET/POST/DELETE"
}

variable "route_path" {
    description = "Path to use for the route"
}

variable "route_auth_type" {
    description = "Authorization type to use for route, either NONE or AWS_IAM"
    default = "NONE"
}

variable "lambda_source" {
    description = "Filename of lambda source for operation function"
}

variable "auth_role_arn" {
    description = "ARN of role to use for authorization of the lambda function"
}

variable "api_gw_id" {
    description = "Identifier of the API Gateway resource the function will be deployed against"
}