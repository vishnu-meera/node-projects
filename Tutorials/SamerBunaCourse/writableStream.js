// const Writable = require('stream').Writable;

// const outStream = new Writable({

// 	write(chunk,encoding,cb){
// 		console.log(chunk.toString());
// 		cb();
// 	}

// });

// process.stdin.pipe(outStream);

// process.stdin.pipe(process.stdout)

const Readable = require('stream').Readable;

// const instream = new Readable();

// instream.push('VIHSNU');
// instream.push(null);
// instream.pipe(process.stdout);

const instream = new Readable({
	read(size){
		this.push(String.fromCharCode())
	}
});


instream.currentCharCode = 65;