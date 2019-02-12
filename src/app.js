"use strict";

const StoreAndReply = require('./StoreAndReply');

// Use Express
const express = require('express');
const app = express();

// AWS X-Ray
const AWSXRay = require('aws-xray-sdk');
app.use(AWSXRay.express.openSegment('StoreAndReply'));

function buildResponse(message) {
    const response = {
        message: message
    };
    console.log('response: ' + JSON.stringify(response));
    return response;
}

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(
        buildResponse(
            StoreAndReply.process(req.query.user, req.query.message)
        )
    );
});

// AWS X-Ray
app.use(AWSXRay.express.closeSegment());

const server = app.listen(process.env.PORT || 3000,
    () => console.log('Listening on port ' + server.address().port));

module.exports = app; // for testing