const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter{

	execute(asyncFuct,args){
		console.time('execute');
		var self=this;
		this.emit('begin');
		asyncFuct(args,function(err,data){
			if(err){
				return self.emit('error',err);
			}

			self.emit('data',data);
			console.timeEnd('execute');
			self.emit('end');
		});
	}
}

const withTime = new WithTime();

withTime.on('begin',()=> console.log("About to execute"));
withTime.on('end',()=> console.log("Done with execute"));

withTime.on('data',(data)=> console.log(`data: ${data}`));


withTime.execute(fs.readFile,'./numbers.txt')

withTime.on('error',(err)=> console.log(`error: ${err}`));