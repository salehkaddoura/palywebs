var express = require('express');
var app = express();
var AWS = require('aws-sdk');

var port = process.env.port || 8080;

AWS.config.update({accessKeyId: 'AKIAIPLMO3URB62ICYEA', secretAccessKey: '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', region: 'us-west-1'});

app.get('/', function(req, res) {
	res.json({ message: 'Hey!' });
});

app.get('/images', function(req, res) {
	var imgObj = [];
    var s3 = new AWS.S3();
    var params = {
        Bucket: 'palywebs-test'
    }

    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {

            data.Contents.map(function(image, index) {
                imgObj.push({
                    url: 'https://s3-us-west-1.amazonaws.com/palywebs-test/' + image.Key
                });
            });

            res.json(imgObj);
        }
    });
    
});

app.listen(port);
console.log("The magic happens on port: " + port);
