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
                "NewsID": {
                    "S": payload["NewsID"]
                },
                "Headline": {
                    "S": payload["Headline"]
                },
                "Description": {
                    "S": payload["Description"]
                },
                "Date": {
                    "S": payload["Date"]
                },
                "WebURL": {
                    "S": payload["WebURL"]
                },
                "ContactName": {
                    "S": payload["ContactName"]
                },
                "ContactEMail": {
                    "S": payload["ContactEMail"]
                },
                "ContactPhone": {
                    "S": payload["ContactPhone"]
                },
                "ExpirationDate": {
                    "S": payload["ExpirationDate"]
                },
                "Approved": {
                    "S": "N"
                }
            }
        )
        print(dynamodb_response)
        return {
            'statusCode': 200,
            'body': '{"status": "News created"}'
        }
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }