const fs = require('fs');

//var fileName 	= "\\\\WCOBPPOSAPP05\\d$\\E-Receipt\\Logs\\EReceiptMQClientService.log"
var fileName	= "\\\\WCOBPPOSAPP06\\d$\\PublishPOSTransactions\\Logs\\PublishPosTransactions.log"
const ReadFilePromise = fileName => {
	return new Promise((resolve,reject)=>{
		fs.readFile(fileName,(err,data)=>{
			if (err) reject(err);
			resolve(data);
		})
	});
}
/*
ReadFilePromise(fileName)
	.then((data)=>{
		let x = data.slice(1,100)
		console.log(x.toString())
	})
	.catch(err=>console.error(err));
*/

fs.access(fileName,fs.constants.R_OK,(err)=>{
	console.log(err)
})