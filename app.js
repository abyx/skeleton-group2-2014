var Q = require('q');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/example', function(request, response) {
  response.send({success: true});
});

app.get('/WhatsOut', function(request, response) {
  console.log('start get in the server');
  console.log('request=' +request.query.username);
  response.send({"sender":"ronen","content":"hello"})

});

app.post('/', function(request,response) {
  //console.log("request method " + request.method);
     console.log("Sender: " + request.body.Sender);
     console.log("Message Body: " + request.body.Message);

     response.writeHead(200, {"Content-Type": "text/plain"});
     response.write("success");
     response.end();
});
app.post('/WhatsOut', function(request, response) {
  console.log(request.body.sender);
  console.log(request.body.date);
  console.log(request.body.content);

  /*console.log(request.body, request.params.id, 'query', request.query);
  console.log(request.body, request.params.id, 'query', request.query);
  console.log(request.body, request.params.id, 'query', request.query);*/
  response.sendStatus(200);
});

mongo.connect('mongodb://localhost/app', function(err, aDb) {
  if (err) {
    throw err;
  }

  db = aDb;
  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(' [*] Listening at http://%s:%s', host, port);
  });
});

