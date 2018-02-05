//ulvappysh01:8443/bankcard/ws/v2/ping
//https://ulvappysh01:8443/bankcard/ws/v2/ping
var https = require('https')
var options = {
   host: 'ulvappysh01',
   port: 8443,
   path: '/bankcard/ws/v2/ping',
   headers: {
      'Authorization': 'Basic ' + new Buffer('vsankar@rei.com' + ':' + 'Rei@2017').toString('base64')
   }   
};
//this is the call
request = https.get(options, function(res){
   var body = "";
   res.on('data', function(data) {
      body += data;
   });
   res.on('end', function() {
    //here we have the full response, html or json object
      console.log(body);
   })
   res.on('error', function(e) {
      onsole.log("Got error: " + e.message);
   });
});
