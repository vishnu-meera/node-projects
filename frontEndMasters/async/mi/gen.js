function coroutineGenerators(g){
	let it =g();

	return function(){
		return it.next.apply(it,arguments);
	}
}

const run = coroutineGenerators(function* gen(){
	var x = 0
	for (let i = 0; i < 10; i++) {
		console.log(x);
		x = x + i + (yield);
	}
	yield x;
});

for (var i = 0; i < 10; i++) {
	console.log(run(i))
}

