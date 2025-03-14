resource "aws_dynamodb_table" "events" {
    name = "${var.env_name}_Events"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "EventID"

    attribute {
        name = "EventID"
        type = "S"
    } 
}

resource "aws_dynamodb_table" "news" {
    name = "${var.env_name}_News"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "NewsID"

    attribute {
        name = "NewsID"
        type = "S"
    } 
}

resource "aws_dynamodb_table" "helpwanted" {
    name = "${var.env_name}_HelpWanted"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "HelpID"

    attribute {
        name = "HelpID"
        type = "S"
    } 
}

resource "aws_dynamodb_table" "services" {
    name = "${var.env_name}_Services"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "ServiceID"

    attribute {
        name = "ServiceID"
        type = "S"
    } 
}

resource "aws_dynamodb_table" "donations" {
    name = "${var.env_name}_Donations"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "DonationID"

    attribute {
        name = "DonationID"
        type = "S"
    } 
}