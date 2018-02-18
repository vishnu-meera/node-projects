const edge 					= require('edge-js');
const connectionString 		= "Server=PC0BAJRP;Integrated Security=SSPI;Database=Temp;"


function RunQuery(query,resolve,reject){
	edge.func('ms-sql', { connectionString : connectionString, source:  query, commandTimeout : 0})(null,function(err,result){
		if(err)
			reject(err);
		else
			resolve(result);
	});
}

function GetPromiseForQ(query){
	return new Promise(function executor(resolve,reject){
		RunQuery(query,resolve,reject);
	})
}

function outputConsole(result){
	console.log('result');
	console.log('=================');
	console.log(result);
}
/*
const query1 = GetPromiseForQ(`select top 1 * from AdventureWorksDW2008R2.dbo.DatabaseLog`);
const query2 = GetPromiseForQ(`select top 1 * from AdventureWorksDW2008R2.dbo.DimEmployee`);

query1
.then(outputConsole)
.then(function(result){
	return query2;
})
.then(outputConsole)
.catch(outputConsole);
*/

[`select top 1 * from AdventureWorksDW2008R2.dbo.DatabaseLog`,`select top 1 * from AdventureWorksDW2008R2.dbo.DimEmployee`].map(GetPromiseForQ)
.reduce(
	function(chain, queryPromise){
		return chain
		.then(function(){
			return queryPromise
		})
		.then(outputConsole)
	},
	Promise.resolve()
).catch(outputConsole);
