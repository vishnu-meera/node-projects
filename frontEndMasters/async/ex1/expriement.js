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

const isPromise = function(obj){
	return Boolean(obj) && typeof obj.then === 'function'
}
// **************************************

function getfile(file){
	return new Promise(function(done){
		fakeAjax(file,done);
	});
}

const p1 = getfile("file1");

console.log(isPromise(p1));

