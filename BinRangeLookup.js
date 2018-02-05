var lookup = require('binlookup')();


lookup('438857').then(data => console.log(data.scheme, data.type));
