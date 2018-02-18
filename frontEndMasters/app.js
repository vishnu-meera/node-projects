const req = require('request');

req('http://www.google.com', function (error, response, body) {
  console.log('error:', error);
  console.log('statusCode:',response.statusCode); 
});

console.log("hello randu killo");

for (let i = 0; i < 20; i++) {
	console.log(i);
}