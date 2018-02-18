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

["file1","file2","file3"]
.map(getFile)
.reduce(
	function(chain,filePromise){
		return chain
			.then(function(){
				return filePromise;
			})
			.then(output);
	},
	Promise.resolve() // fulfilled promise to start chain , just like a 0
)
.then(function() {
	output("Complete!");
});