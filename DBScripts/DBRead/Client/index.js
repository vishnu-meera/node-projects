var axio = require('axios');

axio.get('http://localhost:3333/online')
	.then((res)=>{
		console.log(res.status,res.data[0].OnlineCount);
	})
	.catch((err)=>{
		console.log(err);
	});

axio.get('http://localhost:3333/offline')
	.then((res)=>{
		console.log(res.status,res.data[0].OfflineCount);
	})
	.catch((err)=>{
		console.log(err);
	});