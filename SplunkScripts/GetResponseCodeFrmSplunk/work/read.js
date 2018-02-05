var splunkjs 		= require('splunk-sdk')
var service 		= new splunkjs.Service({
	username:"vsankar",
	password:"Splunkae0624",
	scheme:"https",
	host:"rei.splunkcloud.com",
	version:"5.0"
});

var searchQuery = 'search host=*ulv*ppysh* source=*bankcard* "HostResponseErrorNumber" 500865840426| rex field=_raw (?<field1>(<HostResponseErrorNumber.*)) max_match=1 | table field1';
var arr = [1,2,3]
service.oneshotSearch(searchQuery,{earliest_time: "2017-06-01T00:00:00.000-07:00",latest_time: "now"},function(err, results,arr) {
		var row = 'Nil';
		if(results){
			if(results.rows.length>0){
				var row = results.rows[0];
			}
		}
		console.log(row.toString(),arr)
	}
)
console.log("Meera")