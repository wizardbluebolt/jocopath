module "reminder" {
    source = "../../modules/reminder"
    account = "${local.account}"
    region = "${local.region}"
    userpool_id = "us-west-2_J2xOMISRT"
    email_addr_id_arn = "arn:aws:ses:us-west-2:648341344120:identity/pathofjoco.org"
}