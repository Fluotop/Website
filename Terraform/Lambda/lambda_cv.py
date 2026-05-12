import boto3
import json
import os
import logging

#cloudwatch info logs
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb', region_name = "us-east-1")
table = dynamodb.Table('Personal_Website_Table')

def lambda_handler(event, context):

    response = table.get_item(
        Key={"Key": "clicks"}
        )
    
    if "Item" not in response:
        logging.info("No counter in DynamoDB Table. Creating...")
        table.put_item(
            Item={"Key": "clicks", "amount": 1},
        )
    
    else:
        logging.info("Incrementing counter by 1")
        table.update_item(
            Key={
                'Key': 'clicks',
                },
            UpdateExpression='SET amount = amount + :inc',
            ExpressionAttributeValues={
                ':inc': 1
                }
        )
    
    response = table.get_item(
        Key={'Key': 'clicks'}
        )
    item = response['Item']
    count = int(item['amount'])
    
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": os.getenv("WEBSITE", "*"),
            "Access-Control-Allow-Headers": "Content-Type, Origin",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Content-Type": "application/json"
        },
        "body": json.dumps({"amount": count})
    }