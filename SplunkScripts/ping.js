
var splunkjs 		= require('splunk-sdk')
var service 		= new splunkjs.Service({
	username:"vsankar",
	password:"Splunkae0624",
	scheme:"https",
	host:"rei.splunkcloud.com",
	version:"5.0"
});



for (var i = 0; i < 5; i++) {
	service.login(function(err,sucess){
		console.log(`sucess : ${sucess}`);
	});
}