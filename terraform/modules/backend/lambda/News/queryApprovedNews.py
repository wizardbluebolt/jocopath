import logging
import boto3
import json
import os
import time
session = boto3.Session(region_name=os.environ['REGION'])
dynamodb_client = session.client('dynamodb')
currDate = time.strftime("%Y-%m-%d")

def lambda_handler(event, context):
    try:
        # print("event -> " + str(event))
        # payload = json.loads(event["body"])
        dbParms = {
            "TableName": os.environ["TABLE"],
            "FilterExpression": "Approved = :apprVal and ExpirationDate > :cDate",
            "ExpressionAttributeValues": {":apprVal": {"S": "Y"}, ":cDate": {"S": currDate}},
        }
        moreResults = True
        allResults = []
        while (moreResults):
            dynamodb_response = dynamodb_client.scan(**dbParms)
            print(dynamodb_response)
            allResults.extend(dynamodb_response["Items"])
            if "LastEvaluatedKey" in dynamodb_response:
                dbParms["ExclusiveStartKey"] = dynamodb_response["LastEvaluatedKey"]
            else:
                moreResults = False
        print("Returning " + str(len(allResults)) + " News")
        return {
            'statusCode': 200,
            'body': json.dumps(allResults)
        }
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }