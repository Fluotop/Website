variable "dynamodb_name" {
  description = "The name of the dynamodb table"
  type        = string
}

variable "billing_mode" {
  description = "The billing mode of the dynamodb table"
  type        = string
  default     = "PROVISIONED"
}

variable "read_capacity" {
  description = "The read capacity units for the table"
  type        = number
  default     = 1
}

variable "write_capacity" {
  description = "The write capacity units for the table"
  type        = number
  default     = 1
}

variable "hash_key" {
  description = "The hash key for the table"
  type        = string
}

variable "attributes" {
  description = "DynamoDB attributes"
  type = list(object({
    name = string
    type = string
  }))
}

variable "tags" {
  description = "A map of tags to assign to the dynamodb table"
  type        = map(string)
  default     = {}
  
}