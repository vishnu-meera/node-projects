
function makePerson(name, age) {
  let person = Object.create({greet : function(){console.log("hello")}});
  person.name = name;
  person.age = age;
	return person;

}

var vicky = makePerson('Vicky', 24);


// /********* Uncomment these lines to test your work! *********/
console.log(vicky.name); // -> Logs 'Vicky'
console.log(vicky.age); // -> Logs 24