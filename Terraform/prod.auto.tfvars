# Production environment variables
region      = "us-east-1"
environment = "prod"
owner       = "Ben_TF"
project     = "Personal_Website"

bucket_name           = "bdm060897-personal-website"
dashboard_bucket_name = "bdm060897-prod"
domain_name           = "bendemaesschalck.be"
certificate_domain    = "bendemaesschalck.be"

dynamodb_table_name     = "Personal_Website_Table"
dynamodb_billing_mode   = "PROVISIONED"
dynamodb_read_capacity  = 1
dynamodb_write_capacity = 1
dynamodb_hash_key       = "Key"

lambda_function_name = "dynamodb-lambda-cv"
lambda_runtime       = "python3.11"
lambda_environment   = "production"
lambda_log_level     = "info"

api_gateway_name = "cv-http-api"
api_stage_name   = "prod"
