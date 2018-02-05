const mailObj				=	{};
const nodemailer 			= 	require('nodemailer');
const config				=	require('./config').configObj;
const transporter 			=  nodemailer.createTransport('SMTP', 	{
									host: 'khqmail.rei.com',
									port: 25,
									auth:false
								});


mailObj.getCss = function (){
	let css = "<style type='text/css'>"
	css 	+= "body{font-family: Arial;}"
	css 	+= ".tftable {font-size:12px;color:#333;width:50%;border-width: 1px;border-background-color: #729ea5;border-collapse: collapse;}"
	css 	+= ".tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-background-color: #729ea5;text-align:center;}"
	css 	+= ".tftable td{text-align:left;}"
	css 	+= ".heading{text-align:center}"
	css 	+= "</style>"
	return css;
};


const getTable 	= function (tableFormat){
	let body = ""

	body 			+= "<table class='tftable' border='1'>"
	body 			+= "<tr>"
	body 			+= `<th colspan=${tableFormat.length-1} class='heading'>${tableFormat[0]}</th>`
	body 			+= "</tr>"
	body 			+= "<tr>"
	for (var i = 1; i < tableFormat.length; i++) {
		body 			+= `<th>${tableFormat[i]}</th>`
	}
	body 			+= "</tr>"

	return body;
}

mailObj.parseResult  = function(err,results,splunkTableFormat){

	let body  = getTable(splunkTableFormat);
	let count = 0 ;

	if(err){
		body += "<tr><td>Exception while getting splunk result</td><td>"+err+"</td></tr>"
    }else{
	    if(results.rows.length>0){
	    	for (let i =0; i< results.rows.length; i++) {
	    		count+= Number(results.rows[i][1]);
			   	body += `<tr><td>${results.rows[i][0]}</td><td>${results.rows[i][1]}</td></tr>`
	    	}
	    }else{
	    	body += "<tr><td>No Results</td><td>0</td></tr>"
	    }
    }	

    body += "</table><br>"

	return { 'body' : body, 'count': count };
}

mailObj.pasrseTableError = function(err,tableformat){
	
	let body = getTable(tableformat);
	body += `<tr><td>Exception Getting into PaymentHub DB</td><td>${err}</td><td></td></tr>`
	body += "</table><br>"
	return body;

}

mailObj.pasrseTableResult = function(results,tableformat){

	let body = getTable(tableformat);

    if(results.length>0){
    	for (let i =0; i< results.length; i++) {
		    body += `<tr><td>${results[i][0]}</td>${results[i][1]}<td></td><td>${results[i][2]}</td></tr>`
    	}
    }else{
    	body += "<tr><td>No Results</td><td>0</td><td></td></tr>"
    }

    body += "</table><br>"
	return body;
}

mailObj.SentMail = function(body,subject,totalExceptionCount,system){
	console.log('\nSentMail : count=',totalExceptionCount,system);
	//let TO 	= "";
	//TO 		= system ==='PayPal' ? 'vsankar@rei.com' : 'vsankar@rei.com,vvalsan@rei.com,aarunag@rei.com,jjames@rei.com,snthoma@rei.com'
	let mailOptions = {
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to   : 'vvalsan@rei.com,vsankar@rei.com,aarunag@rei.com,jjames@rei.com,snthoma@rei.com,nanil@rei.com,praj@rei.com',
		//to   : 'vvalsan@rei.com,vsankar@rei.com,aarunag@rei.com,jjames@rei.com,snthoma@rei.com,nbohida@rei.com,aflexwa@rei.com,mmahesh@rei.com',
		subject: subject, // Subject line
		html: `Hi All<br><br>${system} Log & Payment Hub Details for Last Hour<br><br> Total Exception is ${totalExceptionCount}. <br><br>${body} <br><br>Thank You<br>IT Retail Team`
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent');
	    transporter.close();
	    return;
	});	
}

exports.mailObj = mailObj;