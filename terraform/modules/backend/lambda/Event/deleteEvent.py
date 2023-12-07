import logging
import boto3
import os
session = boto3.Session(region_name=os.environ['REGION'])
dynamodb_client = session.client('dynamodb')

def lambda_handler(event, context):
    try:
        # print("event -> " + str(event))
        eventID = event["queryStringParameters"]["eventID"]
        print("Event delete ID " + eventID)
        dynamodb_response = dynamodb_client.delete_item(
            TableName=os.environ["TABLE"],
            Key={"EventID": {"S": eventID}}
        )
        # print(dynamodb_response)
        return {
            'statusCode': 200,
            'body': '{"status": "Event deleted"}'
        }
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }