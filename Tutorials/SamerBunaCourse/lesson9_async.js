const fs = require('fs');

const readFileAsArray = (file) => {
	return new Promise(function(resolve,reject){
		fs.readFile(file,(err,data) => {
			if(err){
				reject(err);
			}

			const lines = data.toString().trim().split('\n');
			resolve(lines)
		});
	})
}

readFileAsArray('./numbers.txt')
	.then(lines => {
		const numbers = lines.map(Number);
		const odds	  = numbers.filter(number => number%2===1 )

		console.log(odds);
	}).catch(console.error)