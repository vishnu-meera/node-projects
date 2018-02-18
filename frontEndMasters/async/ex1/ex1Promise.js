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

function getFile(file){
	return new Promise(function executor(resolve){
		fakeAjax(file,resolve);
	});
}

var p1 = getFile("file1")
var p2 = getFile("file2")
var p3 = getFile("file3")

p1
.then(output)
.then(function(){
	return p2;
})
.then(output)
.then(function(response2){
	return p3;
})
.then(output)
.then(function(){
	output('Complete!');
})
