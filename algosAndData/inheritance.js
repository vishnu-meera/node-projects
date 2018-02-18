function ShoppingMall(name,area){
	this.name = name;
	this.area = area;
}

ShoppingMall.prototype.getArea = function(){
	return `area of the mall is ${this.area} sqm`;
}

ShoppingMall.prototype.getName = function(){
	return `name of the mall is ${this.name}`;
}

var Lulu = new ShoppingMall("Lulu",1500)

var bellevue = new ShoppingMall("bellevue",150)

console.log(bellevue.getName());
console.log(bellevue.getArea());
console.log(Lulu.getName());
console.log(Lulu.getArea());
