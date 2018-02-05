process.stdout.write('\u001B[2]\u001B[0;0f')
const server 			= require('net').createServer();
let counter				= 0
let sockets				= {}

server.on('connection',function(socket){
	console.log('Client Connected');
	socket.buf = ''
	socket.Namebuf = ''
	socket.ID  = counter++
	socket.write('Please type your name: ');
	
	socket.on('data',function(data,utf8){

		if(!sockets[socket.ID]){
			if(data.length===2){
				socket.name = this.Namebuf.toString().trim();
				socket.write(`Melcow ${socket.name}\n`)
				sockets[socket.ID] = socket;
				this.Namebuf=''
				return;
			}else
				this.Namebuf+=data
		}

		if(sockets[socket.ID]){
			if((data.length===2)){
				console.log(`${this.ID}: ${this.buf}`)
				for(var key in sockets){
					if(sockets.hasOwnProperty(key)){
						//sockets[key].write('\033[1B');
						//sockets[key].write('\033[0D');
						//sockets[key].write('\033[u');
						if(socket.ID !=key){
							sockets[key].write(`${this.name}: ${this.buf.toString().trim()}\n`)
						}
					}
				}
				this.buf=''
			}else
				this.buf+=data
		}

	});

	socket.setEncoding('utf8');

	socket.on('end', function(){
		console.log(`${socket.name} disconnectd`);
		delete sockets[socket.ID]
	});
});

server.listen(8000,function(){
	console.log('Server bound');
})