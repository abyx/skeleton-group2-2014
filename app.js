var Q = require('q');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db;

app.use(express.static('public'));
app.use(bodyParser.json());



app.get('/WhatsOut', function(request, response) {
  console.log('start get in the server');
  console.log('request=' +request.query.username);

  //response.send({"sender":"ronen","content":"hello"})

  db.collection('smsTable').findOne({isRead: false},function(err,sms){
    if  (err){
      // handle  error
      return;
    }
   if(sms===null){
     console.log('return null');
     response.send({"sender":null,"content":null});
   }
    else
   {

      console.log(sms.sender);
      response.send({"sender":sms.sender,"content":sms.message});

     db.collection('smsTable').updateOne({_id:ObjectID(sms._id)},
         {$set:{isRead: true}},function(err,result){
           if(err){consol.log('error update sms')}
         }
     )

   }


  });

});


app.get('/WhatsOut/All', function(request, response)
{
  console.log('start get in the server');
  console.log('request=' +request.query.username);

  //response.send({"sender":"ronen","content":"hello"})

  db.collection('smsTable').find({isRead: true}).toArray(function(err,oldSms)
  {
    if  (err)
    {
      // handle  error
      return;
    }

     console.log('send back list' );
      console.log('send back list'+oldSms[0].content );
      response.send(oldSms);





  })

  });





app.post('/', function(request,response) {
  //console.log("request method " + request.method);



  db.collection('smsTable').insertOne({sender:request.body.Sender,message:request.body.Message,isRead:false},function (err,result){
    if  (err){
      // handle  error
      return;
    }

    console.log("Sender from moshe: " + request.body.Sender);
    console.log("Message Body moshe: " + request.body.Message);

    var savedTodo = result.ops[0];

  });



response.writeHead(200, {"Content-Type": "text/plain"});
     response.write("success");
     response.end();
});


app.post('/WhatsOut', function(request, response)
{

  db.collection('smsTable').insertOne({sender:request.body.sender,message:request.body.content,isRead:false},function (err,result)
  {
    if (err)
    {
      // handle  error
      return;
    }
  });



        console.log(request.body.sender);
  console.log(request.body.date);
  console.log(request.body.content);





  /*console.log(request.body, request.params.id, 'query', request.query);
  console.log(request.body, request.params.id, 'query', request.query);
  console.log(request.body, request.params.id, 'query', request.query);*/
  response.sendStatus(200);
}
);

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

