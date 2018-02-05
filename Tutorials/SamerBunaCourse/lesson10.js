const dns = require('dns');

dns.lookup('csa.rei.com', function(err,address,family){
	console.log('lookup: ',address,family)
});


//rei.splunkcloud.com - > address: ["52.204.195.46"] reverse for 52.204.195.46:  ["ec2-52-204-195-46.compute-1.amazonaws.com"]
//retail-customer-adapter.rei-cloud.com' - >address: ["10.7.28.23"]
//csa.rei.com ->address: ["10.7.28.88"]->reverse for 10.7.28.88:  ["csa-jb.rei.com","csa.rei.com"]



dns.resolve4('csa.rei.com',function(err, adres){
	if(err){
		console.log(`rseolve4: $e{rr}`);
	}

	console.log(`address: ${JSON.stringify(adres)}`);

	adres.forEach(function(a){
		dns.reverse(a,function(err,hostnames){
			if(err){
				console.log(`reverse: $e{rr}`)
			}
			console.log(`reverse for ${a}:  ${JSON.stringify(hostnames)}`);
		});

	});

});