
var splunkjs 		= require('splunk-sdk')
var service 		= new splunkjs.Service({
	username:"vsankar",
	password:"Splunkae0624",
	scheme:"https",
	host:"rei.splunkcloud.com",
	version:"5.0"
});

var searchParams = {
		earliest_time: "-20m@m",
		latest_time: "now"
};


const RunException = function() {


	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			return;
		}

		var searchQuery = 'search host=*ulv*ppysh* source=*catalina* *paypal* *Exception* NOT (WARN OR *taskExecutor*) | table host | stats count by host| sort host'

		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
		    // Display the results
		    if(err){
				console.log("error: ",err);
		    }else{
			    if(results.rows.length>0){
			    	for (var i =0; i< results.rows.length; i++) {
					    var excep = results.rows[i][0]
					    var count = results.rows[i][1]
					   	console.log(`${excep}----${count}`)
			    	}
			    	
			    }else{
			    	console.log(`NO Exception ----0`)
			    }


		    }
		    RunTraffic();
		  	console.log("------------------------------------------")
		  }
		);

	});
}

const RunTraffic= function() {


	service.login(function(err,sucess){
		if(err || !sucess){
			console.log("error in login");
			return;
		}

		var searchQuery = 'search host=*ulv*ppysh* source=*catalina* *paypal* NOT (WARN OR *taskExecutor*) | table host | stats count by host| sort host'


		service.oneshotSearch(
		  searchQuery,
		  searchParams,
		  function(err, results) {
		    // Display the results
   		    if(err){
				console.log("error: ",err);
		    }else{
			    if(results.rows.length>0){
			    	for (var i =0; i< results.rows.length; i++) {
					    var excep = results.rows[i][0]
					    var count = results.rows[i][1]
					   	console.log(`${excep}----${count}`)
			    	}
			    	
			    }else{
			    	console.log(`NO Exception ----0`)
			    }


		    }
		  	console.log("------------------------------------------")

		  }
		);

	});
}


RunException();
