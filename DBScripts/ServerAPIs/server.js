'use strict'

var edge = require('edge');
var http = require('http');
var port = process.env.PORT || 3030;

var server = 'S215POS1'
var dataBase = 'GlobalSTORE'

function log(err,res){
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	res.write("Error: " + err);
	res.end("");
}

http.createServer(onRequet).listen(port);

console.log("Node server listening on port " + port);

function onRequet(req,res){
	res.writeHead(200, {'Content-Type' : 'text/html'});

	edge.func('sql',
	{
		source : function(){
				/*select LD.* from GlobalStore.dbo.LN_DETAIL LD
inner join GlobalStore.dbo.TRANS_HEADER th 
on th.TRAN_ID=ld.TRAN_ID and th.STR_ID=ld.STR_ID
where RGST_ID=33 and TRAN_END_DTTM between '2016-09-01' and '2016-09-02'*/
		},
		connectionString : "Server="+server+";Integrated Security=SSPI;Database="+dataBase+";"
	})(null, 
		function(err,result){
			if(err){log(err,res); return; }
			console.log(result)
			if(result){
				res.write(JSON.stringify(result));
				res.end();
		}
	});
	console.log("start action camera");
}
