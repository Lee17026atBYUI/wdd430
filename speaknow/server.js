// Get dependencies
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const Speaker = require('./server/models/speaker');

mongoose.connect('mongodb://localhost:27017/speaknow')
  .then((res) => {
    console.log('Connected to database!');
  })
  .catch(err => {
    console.log('Failed to connect:' + err);
  });

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.get('/speakers', (req, res, next) => {
  Speaker.find()
  .then((speakers) => {
    res.status(200).json({speakers: speakers});
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

app.post('/speakers', (req, res, next) => {
  const speaker = new Speaker({
    name: req.body.name,
    lastSpoke: req.body.lastSpoke
  });

  speaker
    .save()
    .then((createdSpeaker) => {
      res.status(201).json({
        message: "Speaker added.",
        speaker: createdSpeaker
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'An error occurred friendo.',
        error: err,
      });
    });
});

app.put('/speakers/:id', (req, res, next) => {
  Speaker.findOne({ _id: req.params.id })
    .then((speaker) => {
      speaker.name = req.body.name;
      speaker.lastSpoke = req.body.lastSpoke;

      Speaker.updateOne({ _id: req.params.id }, speaker)
        .then((result) => {
          Speaker.find()
          .then((speakers) => {
            res.status(200).json({ speakers: speakers });
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: 'Error!',
            error: err,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Speaker not found.',
        error: { speaker: 'Speaker not found' },
      });
    });
});

app.delete('/speakers/:id', (req, res, next) => {
  Speaker.findOne({ _id: req.params.id })
    .then(speaker => {
      Speaker.deleteOne({_id: req.params.id})
        .then(result => {
          res.status(200).json({
            message: "Speaker deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Speaker not found.',
        error: { speaker: 'Speaker not found'}
      });
    });
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
