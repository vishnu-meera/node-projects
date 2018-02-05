
const splunkjs 				= require('splunk-sdk')
const nodemailer 			= require('nodemailer');
const oracledb            	= require('oracledb'); 
const moment              	= require('moment');

const service 				= new splunkjs.Service({
									username:"vsankar",
									password:"Splunkae0624",
									scheme:"https",
									host:"rei.splunkcloud.com",
									version:"5.0"
								});
const searchParams 			= {
									earliest_time: "-60m@m",
									latest_time: "now"
								};

const transporter 			=  nodemailer.createTransport('SMTP', {
								    host: 'khqmail.rei.com',
								    port: 25,
								    auth:false
								});

const config        		= {  
		                         user: "pysh_readonly",  
		                         password: "wl2leepq8s7j",  
		                         connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
		                    	} 
var today      		 		= moment().format('YYYY-MM-DD h:mm a')
var totalExceptionCount 	= 0

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

const GetTable 	= function (body,header,columnName){
	body 			+= "<table class='tftable' border='1'>"
	body 			+= "<tr>"
	body 			+= `<th colspan='2' class='heading'>${header} Last Hour</th>`
	body 			+= "</tr>"
	body 			+= "<tr>"
	body 			+= `<th>${columnName}</th>`
	body 			+= "	<th>Count</th>"
	body 			+= "</tr>"
	return body;
}


exports.RunExceptionCount = function() {
	let body 	= GetTable(GetCss(),"Bankcard Exception Count: ","Host Name");
	totalExceptionCount = 0;

	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			body += `<tr><td>Excpetion ${err}</td><td>---</td></tr>`
			SendErrorMail(body);
			return;
		}

		let searchQuery = 'search host=*ulv*ppysh* source=*bankcard* *Exception* NOT WARN | table host | stats count by host| sort host'

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

		var searchQuery = 'search host=*ulv*ppysh* source=*bankcard* *Exception* NOT WARN | rex field=_raw (?<field1>Exception:(.*)) |table DEDUP field1 |  stats count by  field1 | SORT -count'

		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
			body+= ParseResults(err, results,true);	   
		    RunTrafficCount(body);
		  }
		);

	});
}

const RunTrafficCount= function(body) {
	body 	= GetTable(body,"Bankcard Traffic Count: ","Host Name");

	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			SendErrorMail(body);
			return;
		}

		let searchQuery = 'search host=*ulv*ppysh* source=*bankcard* NOT *taskExecutor* | table host | stats count by host| sort host'

		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
			body+= ParseResults(err, results,false);	   
			readOracleDb(body)
		  }
		);

	});
}




const readOracleDb = function(body){
	var tohour                	= moment().format('YYYY-MM-DD HH-mm-ss')
	var fromhour              	= moment().add(-1,'hour').format('YYYY-MM-DD HH-mm-ss')
	const config        = {  
	                         user: "pysh_readonly",  
	                         password: "wl2leepq8s7j",  
	                         connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
	                    }
	const query         = `  Select event_call_type,status,count(*) as countOf
	                         from EVENT_LOG
	                         where EVENT_SYSTEM = 'Bankcard Web Service'
	                         and event_start_time >= TO_date('${fromhour}', 'SYYYY-MM-DD HH24:MI:SS')
	                         and event_start_time <= TO_date('${tohour}', 'SYYYY-MM-DD HH24:MI:SS')
	                         group by event_call_type,status
	                         order by event_call_type,status,countOf`

	body 			+= "<table class='tftable' border='1'>"
	body 			+= "<tr>"
	body 			+= `<th colspan='3' class='heading'>BankCard PaymentHub--EventLog Table: Last Hour </th>`
	body 			+= "</tr>"
	body 			+= "<tr>"
	body 			+= `<th>EVENT_CALL_TYPE</th>`
	body 			+= `<th>Status</th>`
	body 			+= "<th>Count sucess/failure</th>"
	body 			+= "</tr>"			
                     
	oracledb.getConnection(config, function(err, connection) {  
		if (err) {  
		     body += "<tr><td>Exception Getting into PaymentHub DB</td><td>"+err+"</td></tr>"
		     SendErrorMail(body);
		}  
		connection.execute(query,[],function(err, result) { 
			doRelease(connection) 
			if (err) {  
				body += "<tr><td>Exception Getting into PaymentHub DB</td><td>"+err+"</td></tr>"
				SendErrorMail(body);
			}    
			if(result){
				let rows = result.rows;
				for (var i = 0; i < rows.length; i++) {
				  console.log(rows[i][0],'--',rows[i][1],'--',rows[i][2])
				  body += `<tr><td>${rows[i][0]}</td>${rows[i][1]}<td></td><td>${rows[i][2]}</td></tr>`
				}
			    body += "</table><br>"
				console.log("********")
			}else{
				body += `<tr><td>No Results</td><td>0</td></tr>`
			}
			SentMail(body)
		});  
	}); 

}

function doRelease(connection) {  
     connection.release(  
          function(err) {  
               if (err) {console.error(err.message);}  
          }  
     );  
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


const SentMail = function(body){
	today      		 		= moment().format('YYYY-MM-DD h:mm a')
	if(totalExceptionCount > 50){
		subject 			= 'Action : Req / Bank Card Log & Payment Hub Last 1 Hour : '+today+' (PST)';
	}else{
		subject 			= 'Bank Card Log & Payment Hub Last 1 Hour: '+today+' (PST)';
	}

	var mailOptions = {
		//from: '"Vishnu Sankar" <vsankar@rei.com>', // sender address
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to   : 'vsankar@rei.com',
		subject: subject, // Subject line
		html: `Hi All<br><br>BankCard Log & Payment Hub Details for Last Hour<br><br> Total Exception is ${totalExceptionCount}. <br><br>${body} <br><br>Thank You<br>IT Retail Team`
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

const SendErrorMail = function(body){
	var mailOptions = {
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to   : 'vsankar@rei.com',
		subject: "Action Required : Exception Giftcard Details", // Subject line
		html: 'Hi All' + '<br><br>' + body// html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent');
	    transporter.close();
	});	
}
