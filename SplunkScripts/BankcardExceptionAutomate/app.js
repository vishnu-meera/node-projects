
var splunkjs 		= require('splunk-sdk')
var service 		= new splunkjs.Service({
	username:"vsankar",
	password:"Splunkae0624",
	scheme:"https",
	host:"rei.splunkcloud.com",
	version:"5.0"
});
var searchParams = {
	earliest_time: "-1h@h",
	latest_time: "now"
};
var nodemailer 		= require('nodemailer');
var transporter =  nodemailer.createTransport('SMTP', {
    host: 'khqmail.rei.com',
    port: 25,
    auth:false
});

var today      		 	= require('moment')().format('YYYY-MM-DD h:mm a')
var totalExceptionCount = 0

const GetCss = function (){
	var body = "<style type='text/css'>"
	body 	+= "body{font-family: Arial;}"
	body 	+= ".tftable {font-size:12px;color:#333333;width:50%;border-width: 1px;border-background-color: #729ea5;border-collapse: collapse;}"
	body 	+= ".tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-background-color: #729ea5;text-align:center;}"
	body 	+= ".tftable td{text-align:left;}"
	body 	+= ".heading{text-align:center}"
	body 	+= "</style>"
	return body;
}

const GetTable 		= function (body,header,columnName,floatFlag){
	if(floatFlag){
			body 			+= "<table class='tftable' border='1' style='float:left'>"
	}else{
			body 			+= "<table class='tftable' border='1'>"
	}

	body 			+= "<tr>"
	body 			+= `<th colspan='2' class='heading'>${header} ${today} (PST)</th>`
	body 			+= "</tr>"
	body 			+= "<tr>"
	body 			+= `<th>${columnName}</th>`
	body 			+= "	<th>Count</th>"
	body 			+= "</tr>"
	return body;
}

exports.RunTrafficCount = function() {	
	var css 	= GetCss();
	var body 	= GetTable(css,"Host Traffic Count Last Hour: ","Host",false);
	totalExceptionCount = 0;

	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			SendErrorMail();
			return;
		}

		var searchQuery = 'search host=*ulv*ppysh* source=*bankcard* NOT *taskExecutor* | table host | stats count by host| sort host'

		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
			body+= ParseResults(err, results,false);	   
		    RunExceptionCount(body);
		  }
		);

	});
}

const RunExceptionCount= function(mainbody) {
	var body 	= GetTable(mainbody,"Host Exception Count Last Hour: ","Host",true);

	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			SendErrorMail();
			return;
		}

		var searchQuery = 'search host=*ulv*ppysh* source=*bankcard* Exception NOT (PING OR WARN OR "reversal")" | table host | stats count by host| sort host'

		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
			body+= ParseResults(err, results,false);	   
		    RunExceptionType(body);
		  }
		);

	});
}



const RunExceptionType= function(mainbody) {
	var body 	= GetTable(mainbody,"Bankcard Exception Type: ","Exception Name",false);

	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			SendErrorMail();
			return;
		}

		var searchQuery = 'search host=*ulv*ppysh* source=*bankcard* "Exception" NOT (WARN OR "Amount must be") | rex field=_raw (?<field1>Exception:(.{40})) |table DEDUP field1 |  stats count by  field1 | SORT -count'

		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
			body+= ParseResults(err, results,true);	   
		    SentMail(body);
		  }
		);

	});
}



const SentMail = function(body){
	if(totalExceptionCount > 50){
		subject 			= 'Action Req / Bankcard Log Details Last One Hour : '+today+' (PST)';
	}else{
		subject 			= 'Bankcard Log Details Last One Hour: '+today+' (PST)';
	}
	var mailOptions = {
		//from: '"Vishnu Sankar" <vsankar@rei.com>', // sender address
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to   : 'vsankar@rei.com,vvalsan@rei.com,aarunag@rei.com,jjames@rei.com,snthoma@rei.com,nbohida@rei.com', //aflexwa@rei.com,mmahesh@rei.com,
		//to   : 'vsankar@rei.com',
		subject: subject, // Subject line
		html: `Hi All<br><br>Bankcard HOST Exception & Traffic Count For Last One hour is ${totalExceptionCount}. <br><br>${body} <br><br>Thank You<br>IT Retail Team`
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent');
	    transporter.close();
	});	

	totalExceptionCount=0;
}

const SendErrorMail = function(){
	var mailOptions = {
		//from: '"Vishnu Sankar" <vsankar@rei.com>', // sender address
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to   : 'vsankar@rei.com',
		subject: "Action Required : Splunk Error on login", // Subject line
		html: 'Hi All' + '<br><br>' + 'Splunk Error on login'// html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent');
	    transporter.close();
	});	
}

const ParseResults = function(err, results,flag){
	var body = ""
    if(err){
		body += "<tr><td>Exception while getting splunk result</td><td>"+err+"</td></tr>"
    }else{
	    if(results.rows.length>0){
	    	for (var i =0; i< results.rows.length; i++) {
			    var excep = results.rows[i][0]
			    var count = results.rows[i][1]
			    if(flag){
			    	totalExceptionCount += Number(count)
			    }
			   	body += "<tr><td>"+excep+"</td><td>"+count+"</td></tr>"
	    	}
	    }else{
	    	body += "<tr><td>No Results</td><td>0</td></tr>"
	    }
    }	

    body += "</table><br>"
	console.log("********")
	return body;
}