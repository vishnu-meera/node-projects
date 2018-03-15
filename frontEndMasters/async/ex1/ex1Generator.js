const co = require('./co')
function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function coroutine(g){
	let it =g();
	return function(){
		return it.next.apply(it,arguments)
	}
}

function getFile(file){
	return new Promise(function executor(done){
		fakeAjax(file,done)
	})
}

co(function* main(){
	let promise1 = getFile("file1");
	let promise2 = getFile("file2");
	let promise3 = getFile("file3");

	output(yield promise1);
	output(yield promise2);
	output(yield promise3);
	output("complete");
})

