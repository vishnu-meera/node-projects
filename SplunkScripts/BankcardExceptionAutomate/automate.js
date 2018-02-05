var schedule  		= require('node-schedule')
var task 			= require('./bankcardApp').RunExceptionCount;
var APP = {
	scheduleJob : function(){
		rule = '0 * * * *';
		var job = schedule.scheduleJob(rule,function(){
			console.log("Pling!!!");
			task();
		});
	},

	init: function(){
		APP.scheduleJob();
	}
};

(function(){
	APP.init();
})();