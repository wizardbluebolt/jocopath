locals {
  source_file = "${var.operation}${var.object_type_name}"
}

data "archive_file" "lambda_archive" {
    type = "zip"
    source_file = "${path.module}/lambda/${var.object_type_name}/${local.source_file}.py"
    output_path = "${path.module}/lambda/${var.object_type_name}/${local.source_file}.zip"
}

resource "aws_lambda_function" "operation_handler" {
    function_name = "${var.operation}${var.object_type_name}Handler"
    filename = data.archive_file.lambda_archive.output_path
    handler = "${var.operation}${var.object_type_name}.lambda_handler"
    runtime = "python3.11"
    environment {
      variables = {
        REGION = "${var.region}"
        TABLE = "${var.env_name}_${var.db_table}"
      }
    }
    source_code_hash = filebase64sha256(data.archive_file.lambda_archive.output_path)
    role = "${var.auth_role_arn}"
    timeout = "5"
    memory_size = "128"
}

resource "aws_apigatewayv2_integration" "operation" {
    api_id = "${var.api_gw_id}"
    integration_uri = aws_lambda_function.operation_handler.invoke_arn
    integration_type = "AWS_PROXY"
    integration_method = "POST"
    payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "operation" {
  api_id = "${var.api_gw_id}"
  route_key = "${var.http_method} /${var.route_path}"
  target = "integrations/${aws_apigatewayv2_integration.operation.id}"
  authorization_type = "${var.route_auth_type}"
}