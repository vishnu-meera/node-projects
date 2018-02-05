var fs  				= require("fs");
var tempArry			= [];
var spluArry			= []
var referenceNoString	= ''
var splunkjs 			= require('splunk-sdk')

var csvWriter 			= require('csv-write-stream')
var writer 				= csvWriter()
var writer 			= csvWriter({ headers: ["Order ID","Auth_date/Setteled_date","Auth Time","Call Type","Auth_amount/Settled_amount","Approved/Declined","Authcode","Bankcard Messgae","HostResponseErrorNumber","BinRange","RetrievalReferenceNumber"]})

var service 			= new splunkjs.Service({
	username:"vsankar",
	password:"Splunkae0624",
	scheme:"https",
	host:"rei.splunkcloud.com",
	version:"5.0"
});

fs.readFileSync('report.csv').toString().split('\n').forEach(function (line) { 
    let arr = line.split("\t");
    if(typeof arr[8] != 'undefined'){
    	tempArry.push([arr[0].trim(),arr[1].trim(),arr[2].trim(),arr[3].trim(),arr[4].trim(),arr[5].trim(),arr[6].trim(),arr[7].trim(),arr[8].trim(),arr[9].trim()])
    	referenceNoString =  referenceNoString + arr[8].trim().toString() + ' OR '
	}
});

referenceNoString =  '( ' + referenceNoString.substring(0,referenceNoString.length-3) + ' )'

var query = 'search host=*ulv*ppysh* source=*bankcard* "HostResponseErrorNumber" '
	query += referenceNoString
 	query += ' | rex field=_raw (?<field1>(<HostResponseErrorNumber>.*)) max_match=1 | rex field=_raw (?<field3>(<RetrievalReferenceNumber>.*)) max_match=1 | table field3, field1'


writer.pipe(fs.createWriteStream('out.csv'));

service.oneshotSearch(query,{earliest_time: "2017-06-01T00:00:00.000-07:00",latest_time: "now"},function(err, results) {
	var row = 'Nil';
	if(results){
		if(results.rows.length>0){
	    	for (var i =0; i< results.rows.length; i++) {
			    var retrievalRefNo = results.rows[i][0]
			    var hostResponseEr = results.rows[i][1]
			    var ret = retrievalRefNo.substring(retrievalRefNo.indexOf('>')+1,retrievalRefNo.indexOf('>')+13)
			    var hos = hostResponseEr.substring(hostResponseEr.indexOf('>')+1,hostResponseEr.indexOf('>')+6)
			    spluArry.push([ret,hos])
	    	}

	    	for (var i = tempArry.length - 1; i >= 0; i--) {
		    	var HostResponseErrorNumber = 'Nil'
		    	var teArr 					= tempArry[i].toString().split(',');

	    		for (var j = spluArry.length - 1; j >= 0; j--) {
	    			if(spluArry[j].toString().split(',')[0].trim()===teArr[8].trim()){
	    				HostResponseErrorNumber =  spluArry[j].toString().split(',')[1].toString();
	    			}
	    		}

	    		//console.log(HostResponseErrorNumber)
				writer.write([teArr[0],teArr[2],teArr[3],teArr[1],teArr[4],teArr[5],teArr[6],teArr[7],HostResponseErrorNumber,teArr[9],teArr[8].toString()+'R']);
	    	}

			writer.end();
		}
	}
});