function union(arrays) {
	let output = [];

	for(let j=0;j<arguments.length;j++){
		reduce(arguments[j],function(element,output){
			if(!output.includes(element)){
				output.push(element);
			}
		},output);
	}

	return output ;

}

function reduce(array, callback, initialValue) {
  for(let i=0;i<array.length;i++){
    callback(array[i],initialValue)
  }
  return initialValue
}

console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
