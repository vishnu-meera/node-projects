const Excel						= require('exceljs');
const constObject				= require('./constnt.js');
const mailOption				= constObject.payPalmailOptions;
const path						= constObject.payPalPath;
const workbook					= new Excel.Workbook();
workbook.creator 				= 'Vishnu';
workbook.lastModifiedBy 		= 'Vishnu';
workbook.created 				= new Date();
workbook.properties.date1904 	= true;
workbook.views = [
  {
    state :'normal'
  }
]

const nodemailer 				= 	require('nodemailer');
const config 					= 	{
									    host: 'lvamail.rei.com',
									    port: 25,
									    auth:false
									}
const transporter 				=   nodemailer.createTransport('smtp',config);

const WriteExcelSheet = function(name,headers,result){

	let worksheet =  workbook.addWorksheet(name);
	worksheet.columns = headers;
	worksheet.addRows(result)
	worksheet.getRow(1).font = { name: 'Calibri',bold: true,size:12 } 
	workbook.xlsx.writeFile(path).then(function() {
	    
		console.log("PayPal excel is ready, please send mail")

		transporter.sendMail(mailOption, function(error, info){
		    if(error){
		    	console.log(error);
		        return ;
		    }
		    console.log('Message sent');
		    transporter.close();
		});	
	});

}

module.exports = WriteExcelSheet;