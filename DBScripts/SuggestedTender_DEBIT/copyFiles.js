const fs 						= require('fs');
const path 						= require('path');
const mail 						= require('./mail').mailObj;
const taxFilePath				= `C:\\Users\\vsankar\\Desktop\\TaxAudit`;
const auditPath 				= `O:\\Common\\Vish\\TaxAudit`;
const EventEmmitter				= require('events');
let temp						= 0;

class MyEmitter extends EventEmmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', function(){
	temp+=1;
	if(temp===3){
		console.log('all finished sent mail');
		mail.SentMailTax();
	}
});

const copyFileCallback = function(err,files){
	if(err){
		console.log(err);
		return;
	}

	files.map(function(file,index){
		let copyFrom 	= path.join(taxFilePath,file);
		let copyTo 		= path.join(auditPath,file);
		let writeStream	= fs.createWriteStream(copyTo);
		console.log(file,' started to copy')
		fs.createReadStream(copyFrom).pipe(writeStream);

		writeStream.on('finish',function(){
			console.log('copying finised');
			myEmitter.emit('event');
		});

	});

};	

const copyFile = function(){
	fs.readdir(taxFilePath,copyFileCallback);
}

copyFile();


exports.copyFile = copyFile;