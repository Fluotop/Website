terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.2"
}

module "label" {
  source      = "./modules/label"
  name        = var.project
  environment = var.environment
  owner       = var.owner
  project     = var.project
}

provider "aws" {
  region = var.region

  default_tags {
    tags = module.label.tags
  }
}

terraform {
  cloud {
    organization = "BDM060897"

    workspaces {
      name = "Personal_Website"
    }
  }
}



