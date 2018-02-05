const fs 		= require('fs');
const path 		= require('path');
const zlib 		= require('zlib');

const dirname	= path.join(__dirname,'files');
const file 		= path.join(dirname,'big.txt');

fs.createReadStream(file)
.pipe(zlib.createGzip())
.on('data',function(){
	console.log('.');
})
.pipe(fs.createWriteStream(file +'.gz'))
.on('finish',function(){
	console.log('Done');
})