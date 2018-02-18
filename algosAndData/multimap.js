function multiMap(arrVals, arrCallbacks) {
	const obj = {};
	for (let i = 0; i < arrVals.length; i++) {
		let temp =[]
		for (let j = 0; j < arrCallbacks.length; j++) {
			temp.push(arrCallbacks[j](arrVals[i]));
		}
		obj[arrVals[i]] = temp;
	}
	return obj;
}

console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }