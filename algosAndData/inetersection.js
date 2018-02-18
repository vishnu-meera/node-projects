function intersection(arrs) {
	let len = arguments[0].length;
	let theArray = arguments[0]
	const output = [];
	for(let i=0;i<arguments.length;i++){
		if(len>arguments[i].length){
			len=arguments[i].length;
			theArray = arguments[i];
		}
	}

	for(let i=0;i<theArray.length;i++){
		let falg=true;
		for(let j=0;j<arguments.length;j++){
			if(!arguments[j].includes(theArray[i]))
				falg=false;
		}
		if(falg)
			output.push(theArray[i]);
	}

	return output ;

}

function reduce(array, callback, initialValue) {
  for(let i=0;i<array.length;i++){
    initialValue = callback(array[i],initialValue)
  }
  return initialValue
}

intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]);
// should log: [5, 15]