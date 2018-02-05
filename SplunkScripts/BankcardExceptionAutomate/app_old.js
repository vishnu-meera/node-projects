
var splunkjs 		= require('splunk-sdk')
var service 		= new splunkjs.Service({
	username:"vsankar",
	password:"Splunkae0624",
	scheme:"https",
	host:"rei.splunkcloud.com",
	version:"5.0"
});

var nodemailer 		= require('nodemailer');
var transporter =  nodemailer.createTransport('SMTP', {
    host: 'khqmail.rei.com',
    port: 25,
    auth:false
});



exports.RunTask = function() {

	var today           = require('moment')().format('YYYY-MM-DD h:mm a')
	var body 			= "<style type='text/css'>"
	var total_count		= 0
	var subject 		= ""

	body += "body{font-family: Arial;}"
	body += ".tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-background-color: #729ea5;border-collapse: collapse;}"
	body += ".tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-background-color: #729ea5;text-align:center;}"
	body += ".tftable td{text-align:left;}"
	body += ".heading{text-align:center}"
	body += "</style>"
	body += "<table class='tftable' border='1'>"
	body += "<tr>"
	body += "	<th colspan='2' class='heading'>Bankcard Exception / Last hour : "+today+" (PST)</th>"
	body += "</tr>"
	body += "<tr>"
	body += "	<th>Exception Name</th>"
	body += "	<th>Count</th>"
	body += "</tr>"

	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			return;
		}

		var searchQuery = 'search host=*ulv*ppysh* source=*bankcard* "Exception" NOT WARN | rex field=_raw (?<field1>Exception:(.*)) |table  field1 |  stats count by  field1 | SORT count'

		var searchParams = {
				earliest_time: "-1h@h",
				latest_time: "now"
		};

		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
		    // Display the results
		    if(err){
				body += "<tr><td>Exception while getting splunk result</td><td>"+err+"</td></tr>"
		    }else{
			    if(results.rows.length>0){
			    	for (var i =0; i< results.rows.length; i++) {
					    var excep = results.rows[i][0]
					    var count = results.rows[i][1]
					    total_count += Number(count)
					    body += "<tr><td>"+excep+"</td><td>"+count+"</td></tr>"
			    	}
			    }else{
			    	body += "<tr><td>No Exception</td><td>0</td></tr>"
			    }
		    }

		    body += "</table><br>"

		    if(total_count>50){
		    	subject = 'Action Req : Bankcard Exception / Last hour : '+today+' (PST)';
		    }else{
		    	subject = 'Bankcard Exception / Last hour : '+today+' (PST)';
		    }

			var mailOptions = {
				//from: '"Vishnu Sankar" <vsankar@rei.com>', // sender address
				from : 'IT Retail Support <ITRetailSupport@rei.com>',
				to   : 'IT Retail Support <ITRetailSupport@rei.com>', // list of receivers,
				subject: subject, // Subject line
				html: 'Hi All' + '<br><br>' + 'Bankcard Exception Count For Last One hour is ' + total_count + ' <br><br>' + body  + 'Thank You' + '<br>' + 'IT Retail Team'// html body
			};


			if(total_count>0){
			    transporter.sendMail(mailOptions, function(error, info){
			        if(error){
			            return console.log(error);
			        }
			        console.log('Message sent');
			        transporter.close();
			    });		

			 }else{
			 	return;
			 }
		  }
		);

	});
}
