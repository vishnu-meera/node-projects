var fs  			= require("fs");
var searchParams 	= {
	earliest_time: "2017-06-01T00:00:00.000-07:00",
	latest_time: "now"
};

var splunkjs 		= require('splunk-sdk')
var service 		= new splunkjs.Service({
	username:"vsankar",
	password:"Splunkae0624",
	scheme:"https",
	host:"rei.splunkcloud.com",
	version:"5.0"
});


fs.readFileSync('report.csv').toString().split('\n').forEach(function (line) { 
    let arr = line.split("\t");
    if(typeof arr[8] != 'undefined'){
		var refferenceNumber = arr[8].toString().trim();
		console.log(refferenceNumber)
		var searchQuery = 'search host=*ulv*ppysh* source=*bankcard* "HostResponseErrorNumber" '+ refferenceNumber +'| rex field=_raw (?<field1>(<HostResponseErrorNumber.*)) max_match=1 | table field1';

	
		service.oneshotSearch(
			searchQuery,
			searchParams,
			function(err, results) {
				var row = 'Nil';
				if(results){
					if(results.rows.length>0){
						var row = results.rows[0];
					}
				}
				console.log(row.toString())
			}
		);
	}
});