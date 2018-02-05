var fs	   = require('fs');
var csv    = require('fast-csv');

fs.createReadStream("report.csv").pipe(csv())
				.on("data",function(data){
					console.log(data.split("\n"));
				})
				.on("end", function(){
					console.log("\n\ndone")
				});

var stream = fs.createReadStream('report.csv');


/*var csvStream = csv()
				.on('data', function(data){
					console.log(data);
				})
				.on('end',function(){
					console.log('done')
				})

stream.pipe(csvStream);*/
