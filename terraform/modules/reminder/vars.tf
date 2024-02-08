variable "region" {
    description = "Resource creation AWS region"
}

variable "account" {
    description = "AWS account identifier for resource ARNs"
}

variable "userpool_id" {
    description = "Identifier of the Cognito User Pool for reviewer group"
}

variable "email_addr_id_arn" {
    description = "ARN of SES verified domain for sending e-mail address"
}
