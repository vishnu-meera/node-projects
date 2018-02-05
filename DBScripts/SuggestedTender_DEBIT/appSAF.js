
const mail 						= 	require('./mail').mailObj;
const db 						= 	require('./dbConfig').functs;
const moment					= 	require('moment');

const RunApp = function(){

	let _hour						= 	moment().add(0,'day').format('HH');

	const callBack = function(error,result){
		let _body = mail.GetSAFData(error,result);
		mail.SentMail(_body);
	}


	console.log('start ', _hour);
	db.getRegisterWiseSAF (null,callBack);
}

//RunApp();

exports.RunApp = RunApp
