function objOfMatches(array1, array2, callback) {
	const obj = {};
	for(let i=0; i< array1.length; i++){
		let value = callback(array1[i].toString());
		if(array2.includes(value))
			obj[array1[i]] = value
	}
	return obj;
}

console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
//should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }