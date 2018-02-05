const fs 		= require('fs');
/*
const server 	= require('https').createServer({
	key:fs.readFileSync('./key.pem'),
	cert:fs.readFileSync('./cert.pem')
});*/

const server 	= require('https').createServer();

server.on('request',function(req,res){
	res.writeHead(200,{'content-type':'text/plain'})
	res.write('Hello World\n');
	res.end();
});

server.listen(443);