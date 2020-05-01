#!/bin/bash

QUEUE_URL="https://sqs.us-east-1.amazonaws.com/592495317624/diegoferbp-sqs"

for row in $(cat jsontest.json | jq -r '.[] | @base64'); do
    _jq() {
     echo ${row} | base64 --decode | jq .
    }
    JSON=`echo $(_jq )`
    echo $JSON
    aws sqs --profile=poc  send-message --queue-url $QUEUE_URL --message-body="$JSON"
done