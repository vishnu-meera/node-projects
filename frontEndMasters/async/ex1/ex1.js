let value = 0;
const outputObj	= {}
const filesArr = [];

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

function getFile(file) {
	filesArr.push(file);
	fakeAjax(file,function(text){
		value+=1;
		outputObj[file]=text;
		if(filesArr.length === value){
			for (let i = 0; i < filesArr.length; i++) {
				output(outputObj[filesArr[i]]);
			}

			output('Complete!');
		}
	});
}

// request all files at once in "parallel"
// getFile("file1");
// getFile("file2");
// getFile("file3");

var getFileThunk = getfileCb(file,cb){
	return fakeAjax(file,ab);
}

