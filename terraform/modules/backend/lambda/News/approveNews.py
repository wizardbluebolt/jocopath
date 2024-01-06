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
        newsId = payload["pNewsID"]
        print("News request approve ID " + newsId)
        dynamodb_response = dynamodb_client.update_item(
            TableName=os.environ["TABLE"],
            Key={"NewsID": {"S": newsId}},
            ExpressionAttributeValues={":tappr": {"S": "Y"}},
            UpdateExpression="SET Approved = :tappr"
        )
        print(dynamodb_response)
        return {
            'statusCode': 200,
            'body': '{"status": "News approved"}'
        }
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }