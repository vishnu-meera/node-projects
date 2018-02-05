var SMB2 = require('smb2');

var client = new SMB2({
	share:'\\\\10.7.76.67\\d$',
	domain:'reicorpnet',
	username:'vsanka2',
	password:'Rei@2017'
})

client.readdir('\\\\10.7.76.67\\d$\\PublishPOSTransactions\\Logs',function(err,files){
	if(err) throw err;
	console.log(files)
});