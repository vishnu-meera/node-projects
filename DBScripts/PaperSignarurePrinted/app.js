const moment					= 	require('moment');
const edge 						= 	require('edge');
const nodemailer 				= 	require('nodemailer');
const connection 		 		=	"Server=wlvaprpldb01sv;Integrated Security=SSPI;Database=GlobalSTORE;"
const sql   					= 	`select * from GlobalSTORE.[REICORPNET\\vsanka2].[fn_PaperSignatureObtainedTuned](1)`
const sqlPilot					= 	`select * from GlobalSTORE.[REICORPNET\\vsanka2].[fn_PaperSignatureObtainedTuned_PilotRegisters](1)`
const GetData 					= 	edge.func('ms-sql', { connectionString : connection, source:  sql, commandTimeout : 0});
const GetDataPilot 				= 	edge.func('ms-sql', { connectionString : connection, source:  sqlPilot, commandTimeout : 0});
const transporter 				=   nodemailer.createTransport('SMTP', {
									    host: 'khqmail.rei.com',
									    port: 25,
									    auth:false
									});


const GetCss 					= function (){
		let body = "<style type='text/css'>"
		body 	+= "body{font-family: Arial;}"
		body 	+= ".tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-background-color: #729ea5;border-collapse: collapse;}"
		body 	+= ".tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-background-color: #729ea5;text-align:center;}"
		body 	+= ".tftable td{text-align:left;}"
		body 	+= ".heading{text-align:center}"
		body 	+= "</style>"
		return body;
};


const GetTable 	= function (heading){
		let body 		="<table class='tftable' border='1'>"
		body 			+= "<tr>"
		body 			+= `<th colspan='7' class='heading'>Paper Signature Transaction Report:  ${heading}</th>`
		body 			+= "</tr>"
		body 			+= "<tr>"
		body 			+= `<th>DATE</th>`
		body 			+= "<th>TOTAL CREDIT-DEBIT TRANSACTIONS</th>"
		body 			+= "<th>TRANSACTIONS with 'Paper Signature Obtained' (DEBIT)</th>"
		body 			+= "<th>TRANSACTIONS with 'Paper Signature Obtained' (CREDIT)</th>"
		body 			+= "<th>% OF PAPER SIGNATURE TRANSACTIONS (DEBIT)</th>"
		body 			+= "<th>% OF PAPER SIGNATURE TRANSACTIONS (CREDIT)</th>"
		body 			+= "<th>TOTAL %</th>"
		body 			+= "</tr>"
		return body;
};


const mail  = function(day,body){

	let subject = `Paper Signature Transaction Report: ${day}`;
	
	let _mailOptions = {
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to : 'vsankar@rei.com',
		//to   : 'ITRetailSupport@rei.com,mmahesh@rei.com,aflexwa@rei.com,aldento@rei.com',
		subject: subject, 
		html: `Hi All<br><br>${body} <br><br>Thank You<br>IT Retail Team`
	};

	transporter.sendMail(_mailOptions, function(error, info){
	    if(error){
	    	console.log(error);
	        return ;
	    }
	    console.log('Message sent');
	    transporter.close();
	});	

};


const RunApp = function(){

	let _day  	= 	moment().add(-1,'day').format('YYYY-MM-DD');

	const callBack = function(error,result){	
		let body 	= 	GetCss() + GetTable("ALL REGISTERS") ;
		if(error){
			console.log(_day, ' error\n');
			return;
		}

		if(!result.length){
			console.log(_day, ' no rows\n');
			return;
		}

		let date   = result[0]._date;
		let tcount = result[0]._total;
		let dcount = result[0]._debit;
		let ccount = result[0]._credit;
		let dper   = result[0]._debitPer;
		let cper   = result[0]._crediPer;
		let tper   = result[0]._totalPer;
		console.log(date,tcount,dcount,ccount,dper,cper,tper,_day);
		body    	+= `<tr><td> ${date} </td><td> ${tcount} </td><td> ${dcount} </td><td> ${ccount} </td><td> ${dper}% </td><td> ${cper} </td><td> ${tper} </td></tr></table><br>`
		GetDataPilot(null,function(error,result){

			body 	+= 	GetTable("PILOT REGISTERS") ;

			let date   = result[0]._date;
			let tcount = result[0]._total;
			let dcount = result[0]._debit;
			let ccount = result[0]._credit;
			let dper   = result[0]._debitPer;
			let cper   = result[0]._crediPer;
			let tper   = result[0]._totalPer;
			console.log(date,tcount,dcount,ccount,dper,cper,tper,_day);

			body    	+= `<tr><td> ${date} </td><td> ${tcount} </td><td> ${dcount} </td><td> ${ccount} </td><td> ${dper}% </td><td> ${cper} </td><td> ${tper} </td></tr></table><br>`
		
			mail(_day,body)
		})
	}


	console.log('start ', _day);
	GetData(null,callBack);
}

RunApp();

//exports.RunApp = RunApp
