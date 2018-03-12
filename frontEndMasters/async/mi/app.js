const DBObject			= require('./constnt.js');
const DBConnect			= DBObject.DBConnect;
const connectionString 	= DBObject.connectionString;

function RunInDB(query,callBack){
	DBConnect.func('ms-sql', { connectionString : connectionString, source:  query, commandTimeout : 0})(null,function(err,result){
		if(err){
			callBack(err);
		}
		else{
			//console.log('In the main ',result.length)
			callBack(result);
		}
	});
}

function GetConnection(date,nofdays){
		let query 				= DBObject.GetPayPalQReturnsINPosQuery(date,nofdays);
		let value, fn;

		RunInDB(query,function (result){
			if(fn) fn(result) ;
			else value = result ;
		});

		return function(callBack){
			if(value) callBack(value);
			else fn=callBack;
		}
}


function outTheData(result){
	if(Array.isArray(result))
		console.log('Array length ', result.length)
	else
		console.log(result)
}

let queryThunk1 = GetConnection('20180201',7);
let queryThunk2 = GetConnection('20180208',7);
let queryThunk3 = GetConnection('20180215',7);

queryThunk1(function(arryay1){
	outTheData(arryay1);
	queryThunk2(function(arryay2){
		outTheData(arryay2);
		queryThunk3(function(arryay3){
			outTheData(arryay3);
			outTheData('****** *u*k off *****');
		});
	});
});

