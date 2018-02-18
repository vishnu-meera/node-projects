console.log("I am at the beginning of the code");
function log(){
  console.log("I am in the setTimeout callback function");
}
function log1(){
  console.log("Interel Hello");
}
setTimeout(log,0);

console.log("I am at the end of the code");

setInterval(log1,2000);