process.stdin.setEncoding('utf8');

process.stdin.on('readable',function(){
	const chunk = process.stdin.read();

	process.stdout.write(`data  : ${chunk}`)
});


process.stdin.on('end', function(){
	process.stdout.write('end');
});


process.stdout.on('resize', () => {
  console.log('screen size has changed!');
  console.log(`${process.stdout.columns}x${process.stdout.rows}`);
});