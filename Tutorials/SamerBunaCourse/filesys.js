const fs 		= require('fs');
const path 		= require('path');
const dirname	= path.join(__dirname,'files');
const files 	= fs.readdirSync(dirname);

files.forEach(function(file){
	let filePath = path.join(dirname,file)
	fs.stat(filePath,function(err,stats){
		console.log(`${file}--size:${stats.size}`)

		fs.truncate(filePath,stats.size/2,function(err){
			console.log(`${file}--size:${err}`)
		})
	});
})
/*

unlink --delete
*/