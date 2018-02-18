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

	var text ,fn;

	fakeAjax(file,function(reponse){
		if(fn) fn(reponse);
		else text = reponse;
	});

	return function(cb){
		if(text) cb(text);
		else fn = cb;
	}
}

var th1 = getFile("file1")
var th2 = getFile("file2")
var th3 = getFile("file3")

th1(function(text1){
	output(text1);
	th2(function(text2){
		output(text2);
		th3(function(text3){
			output(text3);
			output('Complete!');
		});
	});
});

