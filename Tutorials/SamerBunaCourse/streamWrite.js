const fs 			= require('fs');
const path			= require('path');
const dirname		= path.join(__dirname,'files');
const file  		= path.join(dirname,'big.txt');

const fileW			= fs.createWriteStream(file);

for (var i = 0; i <1e6; i++) {
	fileW.write(
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Proin sit amet aliquam urna. Quisque quis posuere dui. 
				Fusce nec dignissim augue. Nunc in turpis in libero viverra fermentum vel in dolor. 
				Maecenas vitae mattis libero, non pellentesque orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
				Nam dapibus purus ut commodo elementum. Nulla id laoreet ante. Curabitur pharetra accumsan urna ac consequat. Integer eu aliquam sapien. 
				Fusce fermentum augue sapien, et dictum arcu hendrerit quis. Etiam gravida et neque et iaculis. 
				Nulla euismod eros et orci lobortis, sed vulputate leo elementum. Nulla facilisi. Duis purus`
				);
}

fileW.end();