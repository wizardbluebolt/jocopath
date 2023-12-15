data "aws_acm_certificate" "issued" {
  domain = "${var.root_domain_name}"
  types = ["AMAZON_ISSUED"]
  most_recent = true
}

data "aws_route53_zone" "hosted" {
  name = "${var.root_domain_name}"
}

data "aws_iam_policy_document" "assume_role" {
    statement {
      effect = "Allow"

      principals {
        type = "Service"
        identifiers = ["apigateway.amazonaws.com"]
      }

      actions = ["sts:AssumeRole"]
    }
}

resource "aws_iam_role" "cloudwatch" {
    name = "api_gateway_cloudwatch_global"
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_api_gateway_account" "gateway_account" {
    cloudwatch_role_arn = aws_iam_role.cloudwatch.arn
}

data "aws_iam_policy_document" "cloudwatch" {
    statement {
      effect = "Allow"

      actions = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents",
        "logs:GetLogEvents",
        "logs:FilterLogEvents",
      ]

      resources = ["*"]
    }
}

resource "aws_iam_role_policy" "cloudwatch" {
    name = "default"
    role = aws_iam_role.cloudwatch.id
    policy = data.aws_iam_policy_document.cloudwatch.json
}

resource "aws_apigatewayv2_api" "apigw" {
    name = "${var.env_name}"
    description = "PATH API Gateway for ${var.env_name} environment"
    protocol_type = "HTTP"
    cors_configuration {
      allow_credentials = true
      allow_headers = ["*"]
      allow_methods = ["DELETE", "GET", "POST", "PUT"]
      allow_origins = ["http://localhost", "https://pathofjoco.org"]
      expose_headers = ["*"]
      max_age = 60
    }
}

resource "aws_cloudwatch_log_group" "stage_log_group" {
    name = "/aws/api_gw/${aws_apigatewayv2_api.apigw.name}"
    retention_in_days = 30
}

resource "aws_apigatewayv2_domain_name" "apidom" {
  domain_name = "${var.root_domain_name}"

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.issued.arn
    endpoint_type = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_route53_record" "routerec" {
  name = aws_apigatewayv2_domain_name.apidom.domain_name
  type = "A"
  zone_id = data.aws_route53_zone.hosted.zone_id

  alias {
    name = aws_apigatewayv2_domain_name.apidom.domain_name_configuration[0].target_domain_name
    zone_id = aws_apigatewayv2_domain_name.apidom.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_stage" "production" {
    api_id = aws_apigatewayv2_api.apigw.id
    name = "Production"
    auto_deploy = true
    access_log_settings {
      destination_arn = aws_cloudwatch_log_group.stage_log_group.arn

      format = jsonencode({
        requestId               = "$context.requestId"
        sourceIp                = "$context.identity.sourceIp"
        requestTime             = "$context.requestTime"
        protocol                = "$context.protocol"
        httpMethod              = "$context.httpMethod"
        resourcePath            = "$context.resourcePath"
        routeKey                = "$context.routeKey"
        status                  = "$context.status"
        responseLength          = "$context.responseLength"
        integrationErrorMessage = "$context.integrationErrorMessage"
      })
    }
}

resource "aws_apigatewayv2_api_mapping" "prodmap" {
  api_id = aws_apigatewayv2_api.apigw.id
  domain_name = aws_apigatewayv2_domain_name.apidom.id
  stage = aws_apigatewayv2_stage.production.id
}