const slowAdd = (a,b) =>{
	//for (var i = 0; i < 9999999999; i++) {}
	//return a+b

	setTimeout(function(){
		console.log(a+b);
	},10000);
};

slowAdd(3333333333333333,333333322222222222222222222222);
slowAdd(4,4);

//const a = slowAdd(2,3)
//const b = slowAdd(1,3)
//const c = slowAdd(0,3)

//console.log(a)
//console.log(b)
//console.log(c)