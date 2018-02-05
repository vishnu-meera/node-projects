var schedule  		= require('node-schedule')
var task 			= require('./app').RunApp;

var APP2 = {
	scheduleJob : function(){
		rule = '30 0 * * *';
		var job = schedule.scheduleJob(rule,function(){
			console.log("Pling!!! paper signature");
			task();
		});
	},

	init: function(){
		APP2.scheduleJob();
	}
};

(function(){
	APP2.init();
})();
