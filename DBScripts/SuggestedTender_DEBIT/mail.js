const nodemailer 				= 	require('nodemailer');
const moment 					= 	require('moment');
const mailObj 					= 	{}; 

const transporter 				=  nodemailer.createTransport('SMTP', {
									    host: 'khqmail.rei.com',
									    port: 25,
									    auth:false
									});

const GetCss 			= function (){
	let body = "<style type='text/css'>"
	body 	+= "body{font-family: Arial;}"
	body 	+= ".tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-background-color: #729ea5;border-collapse: collapse;}"
	body 	+= ".tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-background-color: #729ea5;text-align:center;}"
	body 	+= ".tftable td{text-align:left;}"
	body 	+= ".heading{text-align:center}"
	body 	+= "</style>"
	return body;
};

const GetCountTable 	= function (){
	let body 		="<table class='tftable' border='1'>"
	body 			+= "<tr>"
	body 			+= `<th colspan='4' class='heading'>Suggested Tender Debit Card Mismatch Count</th>`
	body 			+= "</tr>"
	body 			+= "<tr>"
	body 			+= `<th>DATE</th>`
	body 			+= "<th>DEBIT MISMATCH TRAN COUNT</th>"
	body 			+= "<th>TOTAL DOLLAR VALUE</th>"
	body 			+= "<th>TOTAL SALE RETURN TRAN COUNT</th>"
	body 			+= "</tr>"
	return body;
};

const GetDataTable 		= function (){
	let _todate					= 	moment().add(-1,'day').format('YYYY-MM-DD');
	let body 		= "<table class='tftable' border='1'>"
	body 			+= "<tr>"
	body 			+= `<th colspan='14' class='heading'>Suggested Tender Debit Card Mismatch Metrics for ${_todate}</th>`
	body 			+= "</tr>"
	body 			+= "<tr>"
	body 			+= `<th>RETURN STR ID</th>`
	body 			+= "<th>RETURN RGST ID</th>"
	body 			+= "<th>RETURN TRAN NBR</th>"
	body 			+= "<th>RETURN AMOUNT</th>"
	body 			+= `<th>RETURN TOKEN</th>`
	body 			+= "<th>RETURN MEMBER NBR</th>"
	body 			+= "<th>RETURN CARDHOLDER NAME</th>"
	body 			+= `<th>SALE STR ID</th>`
	body 			+= "<th>SALE RGST ID</th>"
	body 			+= "<th>SALE TRAN NBR</th>"
	body 			+= "<th>SALE AMOUNT</th>"
	body 			+= `<th>SALE TOKEN</th>`
	body 			+= "<th>SALE MEMBER NBR</th>"
	body 			+= "<th>SALE CARDHOLDER NAME</th>"
	body 			+= "</tr>"
	return body;
};
const GetSAFDetailsTable 	= function (){
	let body 		="<table class='tftable' border='1'>"
	body 			+= "<tr>"
	body 			+= `<th colspan='6' class='heading'>Registers with SAF</th>`
	body 			+= "</tr>"
	body 			+= "<tr>"
	body 			+= "<th>REGISTER</th>"
	body 			+= "<th>Successful</th>"
	body 			+= "<th>Status-0-Unprocessed</th>"
	body 			+= "<th>Status-1-Unprocessed</th>"
	body 			+= "<th>Status-5-Unprocessed</th>"
	body 			+= "<th>Other-Unprocessed</th>"
	body 			+= "</tr>"
	return body;
};


mailObj.GetSAFData        	= function(error,result){
	let body = GetCss() + GetSAFDetailsTable();

	if(error){
		console.log('***Error***')
		body += `<tr><td>Exception while getting Database results</td><td>${error}</td></tr>`
	}else{

		if(result.length>0){

			for (let i = 0; i < result.length; i++) {

				let str  	= result[i]['STR_ID'];
				let rgs  	= result[i]['RGST_ID'];
				let suc  	= result[i]['Successful'];
				let stat0  	= result[i]['Status-0-Unprocessed'];
				let stat1  	= result[i]['Status-1-Unprocessed'];
				let stat5  	= result[i]['Status-5-Unprocessed'];
				let other  	= result[i]['Other-Unprocessed']

				if(str.toString().length === 2){
					str = 'S0' + str;
				}else{
					str = 'S' + str
				}

				if(rgs.toString().length === 1){
					rgs = 'R00' + rgs;
				}else{
					rgs = 'R0' + rgs
				}

				let register = str+rgs;
				body += `<tr><td>${register}</td><td>${suc}</td><td>${stat0}</td><td>${stat1}</td><td>${stat5}</td><td>${other}</td>`
				
			}
		}else{
			body += "<tr><td>No Registers with SAF</td></tr>"
		}		
	}


	body += "</table><br>"
	return body;
};


mailObj.SentMail 		= function(body){

	let _todate				= 	moment().add(-1,'day').format('YYYY-MM-DD');

	let subject 			= `Registers with SAF`;
	
	let _mailOptions = {
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to   : 'ITRetailSupport@rei.com,aflexwa@rei.com,vsankar@rei.com',
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

mailObj.GetCount        = function(error,result){

	let temp = GetCss() + GetSAFDetailsTable(), count=0;

    if(error){
		temp += `<tr><td>Exception while getting Database results</td><td>${error}</td></tr>`
    }else{
    	if(result.length>0){
    		count =result.length;
    		let date = result[0]['TRAN_DATE'];
    		let coun = result[0]['Count_Of_transaction_with_problem'];
    		let amt  = result[0]['DOLLAR_AMOUNT'];
    		let tot  = result[0]['TOTAL_SALE_RETURN_TRAN'];
    		temp += `<tr><td>${date}</td><td>${coun}</td><td>${amt}</td><td>${tot}</td></tr>`
    	}else{
    		temp += "<tr><td>No Mismatch data</td></tr>"
    	}
    }
	
	temp += "</table><br>"


	return { 
		mailbody : temp,
		count : count
	}
};

mailObj.GetData        	= function(error,result,body){
	body += GetDataTable();

	if(error){
		console.log('***Error***')
		body += `<tr><td>Exception while getting Database results</td><td>${error}</td></tr>`
	}else{

		if(result.length>0){
			for (let i = 0; i < result.length; i++) {

				let RETURN_STR_ID			= result[i]['RETURN_STR_ID'];
				let RETURN_RGST_ID			= result[i]['RETURN_RGST_ID'];
				let RETURN_TRAN_NBR			= result[i]['RETURN_TRAN_NBR'];
				let RETURN_TOTAL_AMOUNT		= result[i]['RETURN_TOTAL_AMOUNT'];
				let RETURN_TOKEN			= result[i]['RETURN_TOKEN'];
				let RETURN_MEMBER_NBR		= result[i]['RETURN_MEMBER_NBR'];
				let RETURN_CARDHOLDER_NAME	= result[i]['RETURN_CARDHOLDER_NAME'];
				let SALE_STR_ID				= result[i]['SALE_STR_ID'];
				let SALE_RGST_ID			= result[i]['SALE_RGST_ID'];
				let SALE_TRAN_NBR			= result[i]['SALE_TRAN_NBR'];
				let SALE_TOTAL_AMOUNT		= result[i]['SALE_TOTAL_AMOUNT'];
				let SALE_TOKEN				= result[i]['SALE_TOKEN'];
				let SALE_MEMBER_NBR			= result[i]['SALE_MEMBER_NBR'];
				let SALE_CARDHOLDER_NAME	= result[i]['SALE_CARDHOLDER_NAME'];

				body += `<tr><td>${RETURN_STR_ID}</td><td>${RETURN_RGST_ID}</td><td>${RETURN_TRAN_NBR}</td><td>${RETURN_TOTAL_AMOUNT}</td><td>${RETURN_TOKEN}</td><td>${RETURN_MEMBER_NBR}</td><td>${RETURN_CARDHOLDER_NAME}</td>`
				body += `<td>${SALE_STR_ID}</td><td>${SALE_RGST_ID}</td><td>${SALE_TRAN_NBR}</td><td>${SALE_TOTAL_AMOUNT}</td><td>${SALE_TOKEN}</td><td>${SALE_MEMBER_NBR}</td><td>${SALE_CARDHOLDER_NAME}</td></tr>`
			}
		}else{
			body += "<tr><td>No Mismatch data</td></tr>"
		}		
	}


	body += "</table><br>"
	return body;
};


mailObj.SentMailTax 		= function(){

	let subject 			= `Tax Audit Report: 4th Quarter`;
	let _todate				= 	moment().add(-1,'day').format('YYYY-MM-DD');

	let _mailOptions = {
		from : 'IT Retail Support <ITRetailSupport@rei.com>',
		to   : 'vsankar@rei.com',
		subject: subject, 
		html: "Hi All<br><br>The Tax audit report for the last 3 monnths is shared @ <br> O:\\Common\\Vish*\\TaxAudit .<br><br>Thank You<br>IT Retail Team"
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

exports.mailObj = mailObj;

