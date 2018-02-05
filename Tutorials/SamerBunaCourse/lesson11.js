const http = require('http');

const request = http.request({hostname:'www.google.com'},
	(res)=>{
		console.log(res.statusCode);
		console.log(res.headers);

		res.on('data',(data)=>{
			console.log(data.toString());
		});
	});

request.on('error',(e)=>console.log(e));

request.end()
// or we can use http.get