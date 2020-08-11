var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.use(serveStatic(path.join(__dirname, 'public')));


app.listen(3000,function(){
    console.log('Node-server running...')
});

app.get('/', function(request, response){
  response.redirect('../client/src/index.html');
});