const EventEmitter = require('events');

class MyEmitter extends EventEmitter{}

const myemitter = new MyEmitter();

myemitter.on('event', function(){
	console.log('an event oaccured');
});


myemitter.on('event1', function(a,b){

	setImmediate(()=>{console.log('happens asynchronously')});
	console.log('an event oaccured');
});

let m=n=0;

myemitter.on('evnet2', function(){
	console.log(++m);
});

myemitter.once('evnet3', function(){
	console.log(++m);
});

