import logging
import boto3
import os
import json

session = boto3.Session(region_name=os.environ['REGION'])
dynamodb_client = session.client('dynamodb')

def lambda_handler(event, context):
    try:
        print("event -> " + str(event))
        payload = json.loads(event["body"])
        helpId = payload["pHelpID"]
        print("Help request approve ID " + helpId)
        dynamodb_response = dynamodb_client.update_item(
            TableName=os.environ["TABLE"],
            Key={"HelpID": {"S": helpId}},
            ExpressionAttributeValues={":tappr": {"S": "Y"}},
            UpdateExpression="SET Approved = :tappr"
        )
        print(dynamodb_response)
        return {
            'statusCode': 200,
            'body': '{"status": "Help Wanted approved"}'
        }
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }