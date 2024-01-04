output "gw_api_id" {
  value = aws_apigatewayv2_api.apigw.id
}

output "gw_api_auth_id" {
  value = aws_apigatewayv2_authorizer.apigw_auth.id
}