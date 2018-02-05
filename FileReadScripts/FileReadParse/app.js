var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('rps.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {
	var z  				= line.toString().split('<tns:ArticleID>');
	var artcile_id		= z[1].toString().substring(0,10);
  	console.log(artcile_id)
  	fs.appendFileSync('out.txt',artcile_id+'\n')
});

rl.on('close', function() {
  // do something on finish here
});