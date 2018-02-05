
const mail 						= 	require('./mail').mailObj;
const db 						= 	require('./dbConfig').functs;
const moment					= 	require('moment');

const RunApp = function(){

	let _todate						= 	moment().add(-1,'day').format('YYYYMMDD');
	let _fromdate					= 	moment().add(0,'day').format('YYYYMMDD');
	let _body 						= 	"";

	const callBack = function(error,result){

		console.log(error);
		let countObj 	= mail.GetCount(error,result)
		_body 			= countObj.mailbody;
		console.log(countObj.count);
	    if(countObj.count>0){
			db.getSpData({todate :_todate , fromdate : _fromdate},callBackCount);
	    }else{
		    mail.SentMail(_body)
		}
			
	}

	const callBackCount = function(error,result){
		_body = mail.GetData(error,result,_body);
		mail.SentMail(_body);
	}
	console.log('start');

	db.getSpCount({todate :_todate , fromdate : _fromdate},callBack);
}

RunApp();

exports.RunApp = RunApp
