function* gen(){
	console.log("vishnu");
	yield 2
	console.log("sankar");
	yield 3
	console.log("meera");
	yield 5
	console.log("raveendran");
}

const it = gen();

let a = it.next();
console.log(a);
a = it.next();
console.log(a);
a = it.next();
console.log(a);
a = it.next();
console.log(a);
a = it.next();
console.log(a);
a = it.next();
console.log(a);
 