import logging
import boto3
import json
import os
session = boto3.Session(region_name=os.environ['REGION'])
dynamodb_client = session.client('dynamodb')

def lambda_handler(event, context):
    try:
        payload = json.loads(event["body"])
        dynamodb_response = dynamodb_client.put_item(
            TableName=os.environ["TABLE"],
            Item={
                "ServiceID": {
                    "S": payload["ServiceID"]
                },
                "ServiceName": {
                    "S": payload["ServiceName"]
                },
                "Description": {
                    "S": payload["Description"]
                },
                "Locations": {
                    "S": payload["Locations"]
                },
                "Addresses": {
                    "S": payload["Addresses"]
                },
                "Phones": {
                    "S": payload["Phones"]
                },                
                "ContactEMail": {
                    "S": payload["ContactEMail"]
                },                
                "WebURL": {
                    "S": payload["WebURL"]
                },
                "Approved": {
                    "S": "N"
                }
            }
        )
        print(dynamodb_response)
        return {
            'statusCode': 200,
            'body': '{"status": "Service created"}'
        }
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }