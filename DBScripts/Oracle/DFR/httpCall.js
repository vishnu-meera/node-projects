const https = require('https');

var options = {
   host: 'ppsh.rei.com',
   port: 8443,
   path: '//https://ulvappysh01.rei.com:8443/bankcard/ws/v2/ping',
   headers: {
      'Authorization': 'Basic dnNhbmthckByZWkuY29tOlJlaUAyMDE3' 
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


//https://ulvappysh01:8443/bankcard/ws/v2/ping