http = require('http');
url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

const httpserver = http.createServer(function(req, res) {
  reqreshandler(req, res);
});

httpserver.listen(3000, function(){
  console.log("Server started, listening on port 3000");
});

var handlers = {};

handlers.hello = function(data, callback){
  callback(200, getResponse(false, data.message));
};

handlers[''] = function(data, callback){
  s = '';
  for( e in handlers) if ( e != '' ) s += ',' + e;
  callback(404, getResponse(true, 'Wrong path: ['+data.path+']. Use one of [' + s.substring(1).trim() + ']'));
};

var routes = {
  'hello' : handlers.hello,
  '' : handlers.help
};

var getResponse = function(error, message) {
  return {
    'isError' : error,
    'message' : message
  };
};

var reqreshandler = function(req, res){
  // request parsing
  var purl = url.parse(req.url);
  var pathname = purl.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  // getting buffer
  var buffer = '';
  var decoder = new StringDecoder('utf-8');
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  // handle request
  req.on('end', function(data){
    buffer += decoder.end(data);
    var handler = handlers[pathname];
    if( typeof(handler) === 'undefined') handler = handlers[''];
    handler({'message': buffer, 'path' : pathname}, function(statusCode, pp) {
      statusCode = typeof(statusCode) == 'number' ? statusCode : 404;
      pp = typeof(pp) == 'object' ? pp : {};
      res.writeHead(statusCode, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(pp));
    });
  });
}
