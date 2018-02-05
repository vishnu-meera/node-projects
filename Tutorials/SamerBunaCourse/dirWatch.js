const fs 			= require('fs');
const path			= require('path');
const dirname		= path.join(__dirname,'files');
const currentFiles	= fs.readdirSync(dirname);

const logMessage = (message) =>{
	console.log(`${message}--time: ${new Date().toUTCString()}`);
}


fs.watch(dirname,function(event,filename){
	if(event==='rename'){
		let index = currentFiles.indexOf(filename);

		if(index>=0){
			currentFiles.splice(index,1);
			logMessage(`${filename} is removed`);
			return;
		}

		currentFiles.push(filename);
		logMessage(`${filename} is added`);
		return;
	}

	logMessage(`${filename} is changed`);

});