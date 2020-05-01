'use strict'

const AWS = require('aws-sdk')
const docDynamo = new AWS.DynamoDB.DocumentClient()

class DynamoHelper {
    saveData(params) {
        return docDynamo.put(params).promise()
    }

    loadDataByParams(params) {
        return docDynamo.query(params).promise()
    }

    updateData(params) {
        return docDynamo.update(params).promise()
    }

    deleteData(params) {
        return docDynamo.delete(params).promise()
    }
}

module.exports = DynamoHelper