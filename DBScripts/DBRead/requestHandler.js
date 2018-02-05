const db			= require('./dbCall').dbCallObj;
const handlerObj	= {};

function writeResult(res,result){
	var resultP = JSON.stringify(result)
	console.log("Rquest handler for start was called");
	console.log(resultP);
	res.setHeader('Access-Control-Allow-Origin', '*');
	//res.setHeader('Access-Control-Request-Method', '*');
	//res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	//res.setHeader('Access-Control-Allow-Headers', '*');
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write(resultP);
    res.end();
}

function writeError(res,result){
	console.log("Rquest handler for upload was called");
	var message = result.message.toString();
	console.log(message);
	res.setHeader('Access-Control-Allow-Origin', '*');
	//res.setHeader('Access-Control-Request-Method', '*');
	//res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	//res.setHeader('Access-Control-Allow-Headers', '*');
    res.writeHead(404,{'Content-Type':'text/plain'});
    if(message===undefined){
    	message = "Unspecified error occured"
    }
    res.write(message);
    res.end();
}


handlerObj.Offline = (res) =>{
	db.OfflineCount(null, function(error, result){
	    if (error) {
			writeError(res,error);
	    } 
	    writeResult(res,result);
	});
}

handlerObj.Online = (res) =>{
	db.OnlineCount(null, function(error, result){
	    if (error) {
	    	writeError(res,error);
	    } 
	    writeResult(res,result);
	});
}

handlerObj.TimeWiseSplit = (res) =>{
	db.TimeWiseSplit(null, function(error, result){
	    if (error) {
	    	writeError(res,error);
	    } 
	    writeResult(res,result);
	});
}


handlerObj.StoreWiseSplit = (res)=>{
	db.StoreWiseSplit(null, function(error, result){
	    if (error) {
	    	writeError(res,error);
	    } 
	    writeResult(res,result);
	});
}

exports.handlerObj 					= handlerObj;


