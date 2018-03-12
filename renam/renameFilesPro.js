const fs = require('fs');
const path = require('path');
const dirnameUn =  path.join(__dirname,'unprocessedfiles')

function ReadFiles(dirname,resolve){

	fs.readdir(dirname,function(err,files){
		if(err){
			console.log(`Error : ${err}`);
			return;
		}
		let outarray = [dirname,files]
		resolve(outarray);
	});
}


function ReadNameFile(outarray){

	outarray[1].forEach(function(file){
		let unProFile = path.basename(file,'.prc').substring(1) + '.txt';
		let newfilepath = path.join(dirnameUn,unProFile)
		let oldfilepath = path.join(outarray[0],file)
		//console.log(oldfilepath,newfilepath)
		fs.rename(oldfilepath,newfilepath,function(err){
			if(err){
				console.log(`Error : ${err}`);
				return;
			}
			console.log(file," done");
		})
	})
}


function ReadFilesPromise(dirname){
	return new Promise(function executor(resolve){
		ReadFiles(dirname,resolve)
	});
}

const read = ReadFilesPromise(path.join(__dirname,'processedfiles'));

read.then(ReadNameFile);