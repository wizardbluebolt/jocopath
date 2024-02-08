import logging
import boto3
import os

session = boto3.Session(region_name=os.environ['REGION'])
cognito_client = session.client('cognito-idp')
mail_client = session.client('sesv2')
dynamodb_client = session.client('dynamodb')

def lambda_handler(event, context):
    try:
        pendingItems = 0
        dbTables = ["Prod_Events", "Prod_HelpWanted", "Prod_News", "Prod_Services"]
        for table in dbTables:
            dbParms = {
                "TableName": table,
                "FilterExpression": "Approved = :apprVal",
                "ExpressionAttributeValues": {":apprVal": {"S": "N"}}
            }
            dynamodb_response = dynamodb_client.scan(**dbParms)
            pendingItems += dynamodb_response["Count"]
        if pendingItems > 0:
            userResponse = cognito_client.list_users_in_group(
                UserPoolId = os.environ['USER_POOL_ID'],
                GroupName = 'reviewers'
            )
            addrList = []
            for user in userResponse["Users"]:
                emailAttr = next((attr for attr in user["Attributes"] if attr["Name"] == 'email'), False)
                if emailAttr:
                    addrList.append(emailAttr["Value"])
            print("Address list " + ' '.join(addrList))
            mail_client.send_email(
                FromEmailAddress='no-reply@pathofjoco.org',
                FromEmailAddressIdentityArn=os.environ['EMAIL_ADDR_ID_ARN'],
                Destination={
                    'ToAddresses': addrList
                },
                ReplyToAddresses=['no-reply@pathofjoco.org'],
                Content={
                    'Simple': {
                        'Subject': {
                            'Data': 'Pending Items Needing Review'
                        },
                        'Body': {
                            'Text': {
                                'Data': 'There are submitted items on https://pathofjoco.org needing review.'
                            }
                        }
                    }
                }
            )
            print("Reminder sent to " + str(len(addrList)) + " addresses")
        else:
            print("No pending items in database")
    except Exception as e:
        logging.error(e)
        return {
            'statusCode': 500,
            'body': '{"status": "Server error"}'
        }
