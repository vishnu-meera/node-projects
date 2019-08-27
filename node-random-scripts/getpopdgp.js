// request('http://api.worldbank.org/v2/countries/in/indicators/SP.POP.TOTL?format=json', function (error, response, body) {

//   let data = JSON.parse(body);

//   console.log('Population:', data[1][0].value); // Print the HTML for the Google homepage.
// });

// request('http://api.worldbank.org/v2/countries/in/indicators/NY.GDP.MKTP.CD?format=json', function (error, response, body) {

//   let data = JSON.parse(body);

//   console.log('GDP:', data[1][0].value); // Print the HTML for the Google homepage.
// });


var request = require('request-promise-native');

var options = {  
    url: 'http://api.worldbank.org/v2/countries/in/indicators/NY.GDP.MKTP.CD?format=json',
    headers: {
        'Accept': 'application/json'
    }
};

async function something (){
    let body = await request.get(options);
    let data = JSON.parse(body);
    console.log(data[1][0].value);
}
something();


209288278
1339180127


