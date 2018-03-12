const DBObject			= require('./constnt.js');
const DBConnect			= DBObject.DBConnect;
const connectionString 	= DBObject.connectionString;

function RunInDB(query,resolve,reject){
	DBConnect.func('ms-sql', { connectionString : connectionString, source:  query, commandTimeout : 0})(null,function(err,result){
		if(err){
			reject(err);
		}
		else{
			resolve(result);
		}
	});
}

function GetConnection(date,nofdays){
		let query 				= DBObject.GetPayPalQReturnsINPosQuery(date,nofdays);

		return new Promise(function executor(resolve,reject) {
			RunInDB(query,resolve,reject)
		});
}


function outTheData(result){
	if(Array.isArray(result))
		console.log('Array length ', result.length)
	else
		console.log(result)
}

let queryPro1 = GetConnection('20180201',7);
let queryPro2 = GetConnection('20180208',7);
let queryPro3 = GetConnection('20180215',7);

queryPro1
	.then(function(result){
		outTheData(result);
		return queryPro2;
	})
	.then(function(result){
		outTheData(result);
		return queryPro3;
	})
	.then(function(result){
		outTheData(result);
	})
	.catch(function(err){
		outTheData(err);
	})
