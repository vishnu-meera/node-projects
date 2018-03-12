const DBObject			= require('./constnt.js');
const processExecel		= require('./createExcel.js');
const DBConnect			= DBObject.DBConnect;
const connectionString 	= DBObject.connectionString;
const sheetName 		= DBObject.paypalSheetName	
const headers 			= DBObject.payPalHeaders

function RunInDB(query,callBack){
	DBConnect.func('ms-sql', { connectionString : connectionString, source:  query, commandTimeout : 0})(null,function(err,result){
		if(err){
			callBack(err);
		}
		else{
			callBack(result);
		}
	});
}

function GetConnectionThunk(date,nofdays){
		console.log('date ', date)
		let query 	= DBObject.GetPayPalQReturnsINPosQuery(date,nofdays);
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

function proceessData(result){
	if(Array.isArray(result))
		processExecel(sheetName,headers,result);
	else
		console.log(result)
}

let queryThunk1 = GetConnectionThunk(DBObject.getPrviousStartDate(),DBObject.Days);

queryThunk1(function(arryay1){
	proceessData(arryay1);
});

