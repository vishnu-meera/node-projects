'use strict'

var getSearchCountObject 	= require('./files').GetSearchCountObject;
var email 					= require('./mail').SendMail;
var today                   = require('moment')().format('YYYY-MM-DD')

var body = "<style type='text/css'>"
body += "body{font-family: Arial;}"
body += ".tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-background-color: #729ea5;border-collapse: collapse;}"
body += ".tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-background-color: #729ea5;text-align:center;}"
body += ".tftable td{text-align:left;}"
body += ".heading{text-align:center}"
body += "</style>"
body += "<table class='tftable' border='1'>"
body += "<tr>"
body += "	<th colspan='4' class='heading'>XXXXX Product Search "+today+" (PST)</th>"
body += "</tr>"
body += "<tr>"
body += "	<th>Date</th>"
body += "	<th>Total Stores</th>"
body += "	<th>Total Search</th>"
body += "	<th>Average Search</th>"
body += "</tr>"


exports.RunTask = function() {
	getSearchCountObject(function(obj){
		for (let i = 0; i < obj.length; i++) {
			body += "<tr>"
			for (let key in obj[i]){
				if (obj[i].hasOwnProperty(key) && obj[i][key]!=='')
					body += "<td>"+obj[i][key]+"</td>"
			}
			body += "</tr>"
		}
		body += "</table><br>"

		var mailOptions = {
	    	from : '<email>',
	    	to: '<email>', // list of receivers,
	    	subject: 'XXXXX Product Search'+today+' (PST)', // Subject line
	    	html: 'Hi All' + '<br><br>' + 'XXXXX Search '+today+' (PST)' + '<br><br>' + body  + 'Thank You' + '<br>' + 'IT Retail Team'// html body
		};

		email(mailOptions);

	});

}


