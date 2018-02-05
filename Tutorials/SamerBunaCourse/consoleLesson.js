const fs  		= require('fs');
const path		= require('path');

const dirname	= path.join(__dirname,'files');
const logFile	= path.join(dirname,'log.txt');
const errFile	= path.join(dirname,'error.txt');
const out		= fs.createWriteStream(logFile);

const err		= fs.createWriteStream(errFile);

const myConsole = new console.Console(out,err);

myConsole.log('hello world')

console.trace('Show me');