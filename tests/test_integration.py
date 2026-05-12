from moto import mock_aws
import boto3
import pytest
import os
import importlib
import json
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "..", "Terraform", "Lambda"))

@pytest.fixture(scope="function")
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
    os.environ["DYNAMODB_TABLE"] = "Personal_Website_Table" #matching prod table name
    os.environ["WEBSITE"] = "http://localhost"
    
@mock_aws
def test_lambda_handler_existing_values(aws_credentials):
    """Testing visitors updating when there are values available in dynamodb table."""
    
    #Moto redirects function table calls to mock table / always create prod table after test table
    cv_lambda = importlib.import_module("lambda_cv")
    
    #Set up mock table
    dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
    test_table = dynamodb.create_table(
        TableName=os.getenv("DYNAMODB_TABLE"),
        KeySchema=[
            {
                "AttributeName": "Key",
                "KeyType": "HASH"
            },
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "Key",
                "AttributeType": "S",
            },
        ],
        ProvisionedThroughput={"ReadCapacityUnits": 1, "WriteCapacityUnits": 1},
    )
    test_table.wait_until_exists()
    
    cv_lambda.table.put_item(
        Item={"Key": "clicks", "amount": 1},
    )
    
    response = cv_lambda.lambda_handler({}, {})
    
    assert response["statusCode"] == 200
    assert response["body"] == json.dumps({"amount": 2})
    assert response["headers"]["Content-Type"] == "application/json"
    assert response["headers"]["Access-Control-Allow-Headers"] == "Content-Type, Origin"
    assert response["headers"]["Access-Control-Allow-Origin"] == "http://localhost"
    assert response["headers"]["Access-Control-Allow-Methods"] == "OPTIONS,POST"
    
    
    dynamodb_response = cv_lambda.table.get_item(
        Key={"Key": "clicks"}
    )

    assert int(dynamodb_response["Item"]["amount"]) == 2

@mock_aws
def test_lambda_handler_empty_table(aws_credentials):
    """Testing visitors updating when there are no values available in dynamodb table."""
    
    cv_lambda = importlib.import_module("lambda_cv")
    
    #Set up mock table
    dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
    test_table = dynamodb.create_table(
        TableName=os.getenv("DYNAMODB_TABLE"),
        KeySchema=[
            {
                "AttributeName": "Key",
                "KeyType": "HASH"
            },
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "Key",
                "AttributeType": "S",
            },
        ],
        ProvisionedThroughput={"ReadCapacityUnits": 1, "WriteCapacityUnits": 1},
    )
    test_table.wait_until_exists()
    
    response = cv_lambda.lambda_handler({}, {})
    
    assert response["statusCode"] == 200
    assert response["body"] == json.dumps({"amount": 1})
    assert response["headers"]["Content-Type"] == "application/json"
    assert response["headers"]["Access-Control-Allow-Headers"] == "Content-Type, Origin"
    assert response["headers"]["Access-Control-Allow-Origin"] == "http://localhost"
    assert response["headers"]["Access-Control-Allow-Methods"] == "OPTIONS,POST"
    
    
    dynamodb_response = cv_lambda.table.get_item(
        Key={"Key": "clicks"}
    )

    assert int(dynamodb_response["Item"]["amount"]) == 1