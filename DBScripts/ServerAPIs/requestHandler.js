var exec = require('child_process').exec;
var fs = require('fs');

function Start(res){
	console.log("Request handler 'Start' was called");

	fs.readFile('view/start.html',"binary",function(err,file){
		if(err){
			res.writeHead(500, {"Content-Type":"text/html"});
			res.write("<h2>GlobalSTORE Reader</h2>");
			res.write("<h3>" + err + "</h3>")
			res.close();
			return;
		}else{
			res.writeHead(200, {"Content-Type":"text/html"});
			res.write("<h2>GlobalSTORE Reader</h2>");
			res.write(file,"binary")
			res.end();
		}
	});
}

function Get(res){
	console.log("Request handler 'Get' was called");

	setTimeout(function(){
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write("<h2>GlobalSTORE Reader</h2>");
		res.write("<h3>" + "hello get" + "</h3>")
		res.end();
	},20000);
}

function GetAll(res){
	console.log("Request handler 'GetAll' was called");
	var content = 'empty';

	exec('dir "c:/REIPOS/" /S',function(err,stdout,stderr){
		content=stdout;
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write("<h2>GlobalSTORE Reader</h2>");
		res.write("<h3>" + content + "</h3>")
		res.end();
	});
}

exports.Get = Get;
exports.GetAll = GetAll;
exports.Start = Start;
