var fs 		= require('fs');
var data 	= process.env 

fs.appendFile('lesson3.txt',JSON.stringify(data),function(err){
	if(err){
		console.log('error : ',err)
	}

	console.log('the data appended to the file')
});