const fs 						= 	require('fs')
const filename 					= 	'./RegisterList.txt'
const array 					= 	fs.readFileSync(filename).toString().split('\n');
const edge 						= 	require('edge');
const connection 		 		=	"Server=wlvaprpldb01sv;Integrated Security=SSPI;Database=GlobalSTORE;"

const sql						= 	`select TIMEZONE from GlobalSTORE.dbo.STORE_TIMEZONE where STR_ID = @store`

const get 						= 	edge.func('ms-sql',{connectionString : connection, source:  sql});

array.forEach(function(data){
	let strnumber = data.substring(1,4);
	console.log(data)
	if(strnumber){
		strnumber = Number(strnumber);
		getData(data,strnumber);
	}
});

function getData (data,strnumber){
	return 	getTimezone({ store: strnumber }, function (error, result) {
    		if (error) throw error;
   			console.log(data,result[0].TIMEZONE);
		});
}