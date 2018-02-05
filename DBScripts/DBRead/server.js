var http 	= require('http');
var url		= require('url');

function start(route,handle){

	function onRequest(req, res){
		var path 		= url.parse(req.url).pathname;
		var postdata	= ''
		
		console.log('Request: ',path)

		req.setEncoding("utf8");

		req.addListener('data',function(chunk){
			postdata+=chunk
		});

		req.addListener('end',function(){
			console.log('POST DATA: ',postdata);
			route(path,handle,res,postdata);
		});
	}

	http.createServer(onRequest).listen(3333);
	console.log('app has started');
}


exports.start = start;


