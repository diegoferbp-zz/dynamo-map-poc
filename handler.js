'use strict';

const dynamoHelper = require('./resources/dynamoHelper')
const dynamo_helper = new dynamoHelper()
const moment = require('moment-timezone')

module.exports.hello = async event => {
    for (let i = 0; i < event.Records.length; i++) {
        let body = JSON.parse(event.Records[i].body)
        console.log("Waiting")
        while (moment().unix() % 60 !== 0) {

        }
        await putElementOutputMap(body.tableKey, body.mapKey, {
            time: moment().valueOf()
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            },
            null,
            2
        ),
    };
};
async function putEmptyOutputMap(tableKey, mapKey) {
    const parameters = {
        TableName: `diegoferbp-poc-map`,
        Key: { key: tableKey },
        UpdateExpression: `set #generated = :e`,
        ExpressionAttributeNames: { '#generated': 'generated' },
        ExpressionAttributeValues: {
            ':e': {}
        },
        ReturnValues: "ALL_NEW",
        ConditionExpression: `attribute_not_exists(generated)`
    }
    await dynamo_helper.updateData(parameters)
    return true
}

async function putElementOutputMap(tableKey, mapKey, element) {
    const parameters = {
        TableName: `diegoferbp-poc-map`,
        Key: { key: tableKey },
        UpdateExpression: `set #generated.#mapKey = :e`,
        ExpressionAttributeNames: { '#generated': 'generated', '#mapKey': mapKey },
        ExpressionAttributeValues: {
            ':e': element
        },
        ReturnValues: "ALL_NEW"
    }
    await dynamo_helper.updateData(parameters)
    return true
}

async function myLoop() {
    let time = moment().unix()
    if (time % 60 !== 0) {
        setTimeout(myLoop, 100)
    } else {
        console.log(`Its Ready! ${time}`)
    }
}