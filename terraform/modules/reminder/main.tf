data "archive_file" "lambda_archive" {
    type = "zip"
    source_file = "${path.module}/lambda/reminderPending.py"
    output_path = "${path.module}/lambda/reminderPending.zip"
}

resource "aws_iam_role" "lambdarole" {
    name = "ReminderPendingLambdaRole"
    assume_role_policy = templatefile("${path.module}/rolePolicy.tftpl", {})
}

resource "aws_iam_policy" "lambdapolicy" {
    name = "ReminderPendingLambdaPolicy"
    path = "/"
    description = "IAM policy for ReminderPending lambda functions"
    policy = templatefile(
                "${path.module}/policy.tftpl", 
                {
                    region = "${var.region}", 
                    account = "${var.account}"
                    userpool_id = "${var.userpool_id}"
                    email_addr_id_arn = "${var.email_addr_id_arn}"
                })
}

resource "aws_iam_role_policy_attachment" "lambdarolepolicy" {
    role = aws_iam_role.lambdarole.name
    policy_arn = aws_iam_policy.lambdapolicy.arn
}

resource "aws_lambda_function" "operation_handler" {
    function_name = "reminderPendingHandler"
    filename = data.archive_file.lambda_archive.output_path
    handler = "reminderPending.lambda_handler"
    runtime = "python3.11"
    environment {
      variables = {
        REGION = "${var.region}"
        USER_POOL_ID = "${var.userpool_id}"
        EMAIL_ADDR_ID_ARN = "${var.email_addr_id_arn}"
      }
    }
    source_code_hash = filebase64sha256(data.archive_file.lambda_archive.output_path)
    role = aws_iam_role.lambdarole.arn
    timeout = "5"
    memory_size = "128"
}
