function coroutineGenerators(g){
	let it =g();

	return function(){
		return it.next.apply(it,arguments);
	}
}

function getData(d){
	setTimeout(function(){it.next(d)},2000);
}
/*
const run = coroutineGenerators(function* gen(){
	console.log("game Starts")
	let x = 1 + (yield getData(10))
	console.log(x)
	let y = 1 + (yield getData(30))
	console.log(y)
	let answer = (yield getData("Meaning of life : " + (x+y)))
	console.log(answer)
	console.log("game finished")
});

run();
*/
function* gen(){
	console.log("game Starts")
	let x = 1 + (yield getData(10))
	console.log(x)
	let y = 1 + (yield getData(30))
	console.log(y)
	let answer = (yield getData("Meaning of life : " + (x+y)))
	console.log(answer)
	console.log("game finished")
}



const it  = gen();
it.next();

