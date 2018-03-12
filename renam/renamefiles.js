const fs = require('fs');
const path = require('path');
const dirname =  path.join(__dirname,'processedfiles')
const dirnameUn =  path.join(__dirname,'unprocessedfiles')

fs.readdir(dirname,function(err,files){
	if(err){
		console.log(`Error : ${err}`);
		return;
	}

	files.forEach(function(file){
		let unProFile = path.basename(file,'.prc').substring(1) + '.txt';
		let newfilepath = path.join(dirnameUn,unProFile)
		let oldfilepath = path.join(dirname,file)
		//console.log(oldfilepath,newfilepath)
		fs.rename(oldfilepath,newfilepath,function(err){
			if(err){
				console.log(`Error : ${err}`);
				return;
			}
			console.log(file," done");
		})
	})
})
