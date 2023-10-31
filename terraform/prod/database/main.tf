terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "=5.23.1"
      }
    }
    backend "s3" {
        bucket = "wizardbluebolt-terraform-state"
        key = "jocopath/prod/database/terraform.tfstate"
        region = "us-west-2"
        dynamodb_table = "wbbtf_pathjoco_lockid"
    }
}

provider "aws" {
  region = "us-west-2"
}

module "database" {
    source = "../../modules/database"
    env_name = "Prod"
}