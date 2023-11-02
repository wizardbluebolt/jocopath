resource "aws_iam_role" "lambdarole" {
    name = "${var.db_table_name}LambdaRole"
    assume_role_policy = templatefile("${path.module}/rolePolicy.tftpl", {})
}

resource "aws_iam_policy" "lambdapolicy" {
    name = "${var.db_table_name}LambdaPolicy"
    path = "/"
    description = "IAM policy for ${db_table_name} lambda functions"
    policy = templatefile(
                "${path.module}/policy.tftpl", 
                {
                    region = "${var.region}", 
                    account = "${var.account}", 
                    db_table_name = "${var.db_table_name}"
                })
}

resource "aws_iam_role_policy_attachment" "lambdarolepolicy" {
    role = aws_iam_role.lambdarole.name
    policy_arn = aws_iam_policy.lambdapolicy.arn
}