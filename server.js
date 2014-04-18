var express = require('express');
var html = require('html');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
//app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
 res.render('index.html');
});

app.get('/*', function(req, res) {
  //.log(req);
  console.log(req.get('Content-Type'));
  console.log(req.path);
 res.sendfile(req.path);
});

var port = (process.env.PORT || 3000);

app.listen(port);
