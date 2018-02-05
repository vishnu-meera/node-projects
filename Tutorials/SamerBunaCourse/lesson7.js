const fs = require('fs');

const readFileAsArray = (file,cb) => {
	fs.readFile(file,(err,data) => {
		if(err){
			cb(err);
		}

		const lines = data.toString().trim().split('\n');
		cb(null,lines)
	});
}

readFileAsArray('./numbers.txt', (err,lines) => {
	if(err){ throw err}

	const numbers = lines.map(Number);
	const odds	  = numbers.filter(number => number%2===1 )

	console.log(odds);
})