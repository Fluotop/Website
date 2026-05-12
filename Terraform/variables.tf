########################################
# Variables
########################################

variable "region" {
  description = "AWS region"
  type        = string
}

variable "environment" {
  description = "Deployment environment (e.g., dev, prod)"
  type        = string
}

variable "owner" {
  description = "Owner of the resources"
  type        = string
}

variable "project" {
  description = "Project name"
  type        = string
}

variable "bucket_name" {
  description = "Name of the S3 bucket to be used for the scraper dashboard"
  type        = string
}

variable "dashboard_bucket_name" {
  description = "Name of the S3 bucket to be used for the scraper dashboard"
  type        = string
}

variable "domain_name" {
  description = "Domain name for the CloudFront distribution (e.g., example.com)"
  type        = string
}

variable "certificate_domain" {
  description = "Domain name for which the ACM certificate is issued (e.g., example.com)"
  type        = string
}


variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
}

variable "dynamodb_billing_mode" {
  description = "Billing mode for DynamoDB (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PROVISIONED"
}

variable "dynamodb_read_capacity" {
  description = "Read capacity units for DynamoDB"
  type        = number
  default     = 1
}

variable "dynamodb_write_capacity" {
  description = "Write capacity units for DynamoDB"
  type        = number
  default     = 1
}

variable "dynamodb_hash_key" {
  description = "Hash key for DynamoDB table"
  type        = string
  default     = "Key"
}

variable "lambda_function_name" {
  description = "Name of the Lambda function"
  type        = string
}

variable "lambda_runtime" {
  description = "Runtime for Lambda function"
  type        = string
  default     = "python3.11"
}

variable "lambda_environment" {
  description = "Environment variable for Lambda"
  type        = string
}

variable "lambda_log_level" {
  description = "Log level for Lambda"
  type        = string
  default     = "info"
}

variable "api_gateway_name" {
  description = "Name of the API Gateway"
  type        = string
}

variable "api_stage_name" {
  description = "Stage name for API Gateway"
  type        = string
}
