var http = require('http');
var port = process.env.PORT || 3030;
var url = require("url");

function start(route, handle){

	function onRequest(req, res){
		var pathName = url.parse(req.url).pathname;
		console.log('request for ' + pathName + ' received');

		route(handle, pathName, res);
	}

	http.createServer(onRequest).listen(port);

	console.log("http server is listening @ " + port);
}

exports.start = start