output "event_db_table" {
    value = aws_dynamodb_table.events.name
}

output "news_db_table" {
    value = aws_dynamodb_table.news.name
}

output "help_db_table" {
    value = aws_dynamodb_table.helpwanted.name
}

output "service_db_table" {
    value = aws_dynamodb_table.services.name
}