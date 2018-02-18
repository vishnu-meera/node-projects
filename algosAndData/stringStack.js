var Stack = function(){
	this.value = "";
}

Stack.prototype.push = function(name){
	this.value =  this.value + "-" + name;
}

Stack.prototype.show = function(){
	console.log(this.value);
}

Stack.prototype.pop = function(){
	var retValue = "";
	if(this.value.length>1){
		var index = this.value.lastIndexOf('-');
		retValue = this.value.substr(index).substr(1);
		this.value = this.value.substr(0,index);
		return retValue;
	}else if(this.value.length===1){
		this.value="";
		return retValue;
	}else{
		return retValue;
	}
}

Stack.prototype.size = function(){
	return this.value.length===0 ? 0 : this.value.match(/-/gi).length ;
}

var myStack = new Stack();

myStack.push("prasanna");
myStack.show();
console.log(myStack.size());
myStack.push("meera");
myStack.show();
console.log(myStack.size());
myStack.push("vishnu");
myStack.show();
console.log(myStack.size());
myStack.push("nandu");
myStack.show();
console.log(myStack.size());

console.log(myStack.pop());
console.log(myStack.size());
console.log(myStack.pop());
console.log(myStack.size());
console.log(myStack.pop());
console.log(myStack.size());
console.log(myStack.pop());
console.log(myStack.size());
console.log(myStack.pop());
console.log(myStack.size());
