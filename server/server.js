var express = require('express');
var app = express();
var engines = require('consolidate');
var bodyParser = require('body-parser');
var database = require('./database');
var fs = require('fs');

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/../views');
app.use("/", express.static(__dirname + '/../views'));
app.use("/js", express.static(__dirname + '/../views/js'));
app.use("/css", express.static(__dirname + '/../views/css'));
app.use("/img", express.static(__dirname + '/../views/img'));


app.post('/', function(req, res) {
  // res.type('text/html'); // set content-type
  res.render('prefix.html');
});

// Submit serp interaction to db.
app.post('/getTrajectory', function(req, res){

  var filename = req.body.filename;
  trajectories = database.loadTrajectoriesFromFile(filename);
  res.json(trajectories);
});

//-------------------------------------------------------
// START THE SERVER
//-------------------------------------------------------
var port = 4730;
app.listen(port);
console.log('Magic happens on port ' + port);
