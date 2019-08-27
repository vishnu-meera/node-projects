const fetch = require('node-fetch');

fetch('http://api.worldbank.org/v2/countries/in/indicators/SP.POP.TOTL?format=json',{ method: 'POST', Accept: "application/json" })
    .then(res => res.text())
    .then(data => console.log(data));