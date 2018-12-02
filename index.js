http = require('http');

const httpserver = http.createServer(function(req, res){
  res.end('It works.');
});

httpserver.listen(3000, function(){
  console.log("Server started, listening on port 3000");
});
