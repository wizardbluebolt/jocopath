import logging
import boto3
import os
import json

session = boto3.Session(region_name=os.environ['REGION'])
dynamodb_client = session.client('dynamodb')

def lambda_handler(event, context):
    try:
        print("event -> " + str(event))
        helpID = event["queryStringParameters"]["helpID"]
        print("Help Wanted delete ID " + helpID)
        dynamodb_response = dynamodb_client.delete_item(
            TableName=os.environ["TABLE"],
            Key={"HelpID": {"S": helpID}}
        )
        # print(dynamodb_response)
        return {
            'statusCode': 200,
            'body': '{"status": "Help Wanted deleted"}'
        }
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }