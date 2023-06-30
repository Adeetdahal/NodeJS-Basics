var http = require('http');
http.createServer(function(req,res){
  res.write('Hello world! Getting started with NodeJS');
  res.end();
}).listen(8080);