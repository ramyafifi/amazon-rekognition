
require('dotenv/config');
const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// Main Route to Main HTML Page
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(8089, function() {
    console.log('Your app is listening on port 8089');
});

/* ***************************************************************************************
// Code used in our Project
// ***************************************************************************************/


/* ****************************
// AWS SDK Config
// ***************************/
/* 
const aws = require("aws-sdk")
aws.config.update({region:'us-east-1'});
*/

/* ****************************
// DETECTLABELS - JSON
// ***************************/
/*
app.post('/detectLabels', function(request, response) {

    let bucketName = request.body.bucketname
    let objectName = request.body.objectname

    let rekognition = new aws.Rekognition()

    let params = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: objectName
            }
        },
        MaxLabels: 50,
        MinConfidence: 90
    }

    rekognition.detectLabels(params, function (err, data){
        if (err){
            console.log(err, err.stack)
        } else {
            response.send(data)
        }
    })

})
********************************************************************/

/* ****************************
// DETECTLABELS - HTML
// ***************************/
/*
app.post('/detectLabels', function(request, response) {

    let bucketName = request.body.bucketname
    let objectName = request.body.objectname

    let rekognition = new aws.Rekognition()

    let params = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: objectName
            }
        },
        MaxLabels: 50,
        MinConfidence: 90
    }

    rekognition.detectLabels(params, function (err, data){
        if (err){
            console.log(err, err.stack)
        } else {
            let table = "<table border=1>"
            for (var i=0; i < data.Labels.length; i++) {
               table += "<tr>";
               table += "<td>"+data.Labels[i].Name+"</td>"
               table += "<td>"+data.Labels[i].Confidence+"</td>"
               table += "</tr>"
            }    
            table += "</table>"
            response.send(table)
        }
    })

})
********************************************************************/

/* ****************************
// IMAGE MODERATION - HTML
// ***************************/
/*
app.post('/imageModeration', function(request, response) {
  
    let bucketName = request.body.bucketname
    let objectName = request.body.objectname

    let rekognition = new aws.Rekognition()

    let params = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: objectName
            }
        },
        MinConfidence: 90
    }
    
    rekognition.detectModerationLabels(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        var table = "<table border=1>"
        for (var i=0; i < data.ModerationLabels.length; i++) {
           table += "<tr>";
           table += "<td>"+data.ModerationLabels[i].Name+"</td>"
           table += "<td>"+data.ModerationLabels[i].Confidence+"</td>"
           table += "</tr>"
        }    
        table += "</table>"
        response.send(table);
      }
    });
  });
********************************************************************/

/* ****************************
// FACIAL ANALYSIS - HTML
// ***************************/
/*
app.post('/facialAnalysis', function(request, response) {

    let bucketName = request.body.bucketname
    let objectName = request.body.objectname

    let rekognition = new aws.Rekognition()

    let params = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: objectName
            }
        },
        Attributes: ['ALL']
    }
    
    rekognition.detectFaces(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        var table = "<table border=1>"
        for (var i=0; i < data.FaceDetails.length; i++) {
           table += "<tr>";
           table += "<td>"+data.FaceDetails[i].AgeRange.Low+"</td>";
           table += "<td>"+data.FaceDetails[i].AgeRange.High+"</td>";
           table += "<td>"+data.FaceDetails[i].Gender.Value+"</td>";
           table += "<td>"+data.FaceDetails[i].Emotions[0].Type+"</td>";     
           table += "</tr>"
        }    
        table += "</table>"
        response.send(table);
      }
    });
});
********************************************************************/

/* ****************************
// CELEBRITY RECOGNITION - HTML
// ***************************/
/*
app.post('/celebrity', function(request, response) {

    let bucketName = request.body.bucketname
    let objectName = request.body.objectname

    let rekognition = new aws.Rekognition()

    let params = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: objectName
            }
        },
    }
    
    rekognition.recognizeCelebrities(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        var table = "<table border=1>"
        for (var i=0; i < data.CelebrityFaces.length; i++) {
           table += "<tr>";
           table += "<td>"+data.CelebrityFaces[i].Name+"</td>";
           table += "<td>"+data.CelebrityFaces[i].MatchConfidence+"</td>";
           table += "<td>"+data.CelebrityFaces[i].Urls[0]+"</td>";
           table += "</tr>"
        }    
        table += "</table>"
        response.send(table);
      }
    }); 
});
********************************************************************/

/* ****************************
// TEXT IN IMAGE - HTML
// ***************************/
/*
app.post('/textImage', function(request, response) {

    let bucketName = request.body.bucketname
    let objectName = request.body.objectname

    let rekognition = new aws.Rekognition()

    let params = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: objectName
            }
        },
    }
    
    rekognition.detectText(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        var table = "<table border=1>"
        for (var i=0; i < data.TextDetections.length; i++) {
           table += "<tr>";
           table += "<td>"+data.TextDetections[i].DetectedText+"</td>";
           table += "<td>"+data.TextDetections[i].Type+"</td>";
           table += "<td>"+data.TextDetections[i].Confidence+"</td>";
           table += "</tr>"
        }    
        table += "</table>"
        response.send(table);
      }
    });  
  });
********************************************************************/

/* ****************************
// FACE COMPARISON - HTML
// ***************************/
/*
app.post('/faceCompare', function(request, response) {
  
    let bucketName = request.body.bucketname
    let faceone    = request.body.faceone
    let facetwo    = request.body.facetwo
    
    let rekognition = new aws.Rekognition()
    
    var params = {
      SourceImage: {
        S3Object: {
            Bucket: bucketName, 
            Name: faceone
        }
      },
      TargetImage: { 
        S3Object: {
            Bucket: bucketName, 
            Name: facetwo
        }
      },
      SimilarityThreshold: 90
    };
    
    rekognition.compareFaces(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      }
      else {
        var table = "<table border=1>"
        for (var i=0; i < data.FaceMatches.length; i++) {
           table += "<tr>";
           table += "<td>"+data.FaceMatches[i].Similarity+"</td>";
           table += "</tr>"
        }    
        table += "</table>"
        response.send(table);
      }
    });
});
********************************************************************/
