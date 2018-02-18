function add(x,y){
	return x+y;
}

var thunk = function(){
	return add(10,15);
}

//thunk()

//Asynchorous thunks----------------------

function addAsyc(x,y,cb){
	setTimeout(function(){ cb(x+y); },2000);
}

var ayncThunk = function(cb){
	return addAsyc(10,15,cb);
}

ayncThunk(function(sum){
	console.log(sum);
});

