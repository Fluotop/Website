
# ----------------------------
# Dashboard S3 Bucket
# ----------------------------

data "aws_s3_bucket" "dashboard_bucket" {
  bucket = var.dashboard_bucket_name
}

resource "aws_s3_bucket_public_access_block" "dashboard_bucket" {
  bucket                  = data.aws_s3_bucket.dashboard_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "dashboard_bucket_policy" {
  bucket = data.aws_s3_bucket.dashboard_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${data.aws_s3_bucket.dashboard_bucket.arn}/scraper/dashboard/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.personal_website_distribution.arn
          }
        }
      }
    ]
  })
}

resource "aws_cloudfront_origin_access_control" "dashboard_oac" {
  name                              = "OAC_for_S3_dashboard_bucket"
  description                       = "Origin Access Control for dashboard S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


# ----------------------------
# CloudFront Function for Dashboard
# ----------------------------

resource "aws_cloudfront_function" "dashboard_index_rewrite" {
  name    = "dashboard-index-rewrite"
  runtime = "cloudfront-js-1.0"
  publish = true
  code    = <<-EOT
    function handler(event) {
      var request = event.request;
      var uri = request.uri;
      
      if (uri === '/dashboard' || uri === '/dashboard/') {
        request.uri = '/dashboard.html';
      }
      return request;
    }
  EOT
}

# ----------------------------
# Cloudfront
# ----------------------------

data "aws_s3_bucket" "personal_website_bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_policy" "bdm060897_personal_website_policy" {
  bucket = data.aws_s3_bucket.personal_website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${data.aws_s3_bucket.personal_website_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.personal_website_distribution.arn
          }
        }
      }
    ]
  })
}

resource "aws_s3_bucket_public_access_block" "personal_website_bucket" {
  bucket                  = data.aws_s3_bucket.personal_website_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "OAC_for_S3_personal_website_bucket"
  description                       = "Origin Access Control for S3 bucket access used in CV project"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


# Imported certificate for domain in us-east-1
data "aws_acm_certificate" "_cert" {
  domain      = var.certificate_domain
  statuses    = ["ISSUED"]
  most_recent = true
}

resource "aws_cloudfront_distribution" "personal_website_distribution" {
  origin {
    domain_name              = data.aws_s3_bucket.personal_website_bucket.bucket_regional_domain_name
    origin_id                = "S3-${data.aws_s3_bucket.personal_website_bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_path              = ""
  }

  origin {
    domain_name              = data.aws_s3_bucket.dashboard_bucket.bucket_regional_domain_name
    origin_id                = "S3-dashboard-${data.aws_s3_bucket.dashboard_bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.dashboard_oac.id
    origin_path              = "/scraper/dashboard"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for personal_website bucket"
  default_root_object = "index.html"

  aliases = ["www.${var.domain_name}", var.domain_name]

  ordered_cache_behavior {
    path_pattern     = "/dashboard*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-dashboard-${data.aws_s3_bucket.dashboard_bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 600
    max_ttl                = 86400

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.dashboard_index_rewrite.arn
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${data.aws_s3_bucket.personal_website_bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 600
    max_ttl                = 86400


  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["MX", "BE"]
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate._cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}


# ----------------------------
# DynamoDB
# ----------------------------

module "dynamodb_cv" {
  source = "./modules/dynamoDB"

  dynamodb_name  = var.dynamodb_table_name
  billing_mode   = var.dynamodb_billing_mode
  read_capacity  = var.dynamodb_read_capacity
  write_capacity = var.dynamodb_write_capacity
  hash_key       = var.dynamodb_hash_key

  attributes = [
    {
      name = var.dynamodb_hash_key
      type = "S"
    },
  ]

}


#set up policy and role for table access

resource "aws_iam_role" "lambda_cv_dynamodb_role" {
  name = "lambda-cv-dynamodb-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

data "aws_iam_policy_document" "lambda_cv_dynamodb_policy" {
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]

    resources = [
      module.dynamodb_cv.dynamoDB_arn
    ]
  }
}

resource "aws_iam_role_policy" "lambda_cv_dynamodb_access" {
  name   = "lambda-cv-dynamodb-access"
  role   = aws_iam_role.lambda_cv_dynamodb_role.id
  policy = data.aws_iam_policy_document.lambda_cv_dynamodb_policy.json
}

resource "aws_iam_role_policy_attachment" "lambda_cloudwatch_logs" {
  role       = aws_iam_role.lambda_cv_dynamodb_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "archive_file" "lambda_cv_zip" {
  type        = "zip"
  source_dir  = "${path.module}/Lambda"
  output_path = "${path.module}/Lambda/lambda_cv.zip"
}

resource "aws_lambda_function" "dynamodb_lambda_cv" {

  filename         = data.archive_file.lambda_cv_zip.output_path
  function_name    = var.lambda_function_name
  role             = aws_iam_role.lambda_cv_dynamodb_role.arn
  handler          = "lambda_cv.lambda_handler" #file_name.function_name
  source_code_hash = data.archive_file.lambda_cv_zip.output_base64sha256
  runtime          = var.lambda_runtime
  environment {
    variables = {
      ENVIRONMENT = var.lambda_environment
      LOG_LEVEL   = var.lambda_log_level
    }
  }
}

# ----------------------------
# HTTP API
# ----------------------------
resource "aws_apigatewayv2_api" "http_api_cv" {
  name          = var.api_gateway_name
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [
      "https://${aws_cloudfront_distribution.personal_website_distribution.domain_name}",
      "https://bendemaesschalck.be",
      "https://www.bendemaesschalck.be"
    ]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["content-type"]
  }
}

# ----------------------------
# Lambda Integration
# ----------------------------
resource "aws_apigatewayv2_integration" "lambda" {
  api_id = aws_apigatewayv2_api.http_api_cv.id

  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.dynamodb_lambda_cv.invoke_arn
  connection_type        = "INTERNET"
  description            = "Api called by lambda function to update DynamoDB"
  payload_format_version = "2.0"
}

# ----------------------------
# Route
# ----------------------------
resource "aws_apigatewayv2_route" "post_visitors" {
  api_id = aws_apigatewayv2_api.http_api_cv.id

  route_key = "POST /visitors"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}


# ----------------------------
# Stage (auto-deploy)
# ----------------------------
resource "aws_apigatewayv2_stage" "stage" {
  api_id      = aws_apigatewayv2_api.http_api_cv.id
  name        = var.api_stage_name
  auto_deploy = true
}

# ----------------------------
# Lambda Permission
# ----------------------------
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.dynamodb_lambda_cv.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.http_api_cv.execution_arn}/*/*"
}


# ----------------------------
# CI/CD Permissions
# ----------------------------

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]
}

resource "aws_iam_role" "CICD_role" {

  name = "CICD_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }

          StringLike = {
            "token.actions.githubusercontent.com:sub" = [
              "repo:Fluotop/Website:ref:refs/heads/main",
              "repo:Fluotop/Website:environment:production"
            ]
          }
        }
      }
    ]
  })

}


#-------------------------------
# CICD IAM policy
#-------------------------------

resource "aws_iam_role_policy" "CICD_policy" {

  name = "CICD_policy"

  role = aws_iam_role.CICD_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ],
        "Resource" : [
          "arn:aws:s3:::${var.bucket_name}",
          "arn:aws:s3:::${var.bucket_name}/*"
        ]
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "cloudfront:CreateInvalidation"
        ],
        "Resource" : "${aws_cloudfront_distribution.personal_website_distribution.arn}"
      }
    ]
  })

}
