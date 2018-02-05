const fs 			= require('fs');
const path			= require('path');
const dirname		= path.join(__dirname,'files');
const file  		= path.join(dirname,'big.txt');
const server		= require('http').createServer();


server.on('request',function(req,res){
	/*fs.readFile(file,function(err,data){
		if(err) throw err;

		res.end(data);
	});*/

	const fileW = fs.createReadStream(file);
	fileW.pipe(res); // src.pipe(dst) = >read.pipe(write)
});

server.listen(8000);
