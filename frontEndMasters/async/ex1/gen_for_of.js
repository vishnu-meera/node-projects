function* generator(){
	yield 'a';
	yield 'b';
	yield 'c';
}


for (const val of generator()){
	console.log(val);
}

const [...values] = generator();

console.log(values);