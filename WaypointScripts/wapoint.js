var request =  require('request')

request({
		baseUrl : "https://rei2.service-now.com/",
		method : 'GET',
		uri : 'api/now/v2/table/sys_user?sysparm_query=user_name%3D' + "vsankar",
		json : true,
		auth: {
            'user': "vsankar",
            'pass': "Rei@2018",
            'sendImmediately': true
        }

	}, function(err, response, body) {
		if (!err && response.statusCode == 200){
			console.log(response);
			console.log(err);
		} else {
			console.log(response);
			console.log(err);
		}
});