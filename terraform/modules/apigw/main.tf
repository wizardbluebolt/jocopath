resource "aws_route53_zone" "primary" {
    name = var.root_domain_name
}

resource "aws_acm_certificate" "domain_cert" {
    domain_name = var.root_domain_name
    validation_method = "DNS"
    lifecycle {
      create_before_destroy = true
    }
}

resource "aws_route53_record" "domain_dns" {
    allow_overwrite = true
    name = tolist(aws_acm_certificate.domain_cert.domain_validation_options)[0].resource_record_name
    records = [tolist(aws_acm_certificate.domain_cert.domain_validation_options)[0].resource_record_value]
    type = tolist(aws_acm_certificate.domain_cert.domain_validation_options)[0].resource_record_type
    zone_id = aws_route53_zone.primary.zone_id
    ttl = 60
}

resource "aws_acm_certificate_validation" "domain_cert_validation" {
    certificate_arn = aws_acm_certificate.domain_cert.arn
    validation_record_fqdns = [aws_route53_record.domain_dns.fqdn]
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
}

resource "aws_cloudwatch_log_group" "stage_log_group" {
    name = "/aws/api_gw/${aws_apigatewayv2_api.apigw.name}"
    retention_in_days = 30
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