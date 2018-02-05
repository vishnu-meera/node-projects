const db 						= require('./dbConfig').functs;
const copyFile 					= require('./copyFiles').copyFile;

const RunApp = function(){

	const callStoredProccallBack = function(error,result){
	    if(error){
	    	console.log(error);
	    	return;
	    }	
	    console.log("files generated ...copying...\n")
	    copyFile();
	};

	db.generateTaxAuditReprt({x :1 , y:3 },callStoredProccallBack);
	console.log('running......')
}

RunApp();



