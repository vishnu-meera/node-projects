var schedule  		= require('node-schedule')
var task 			= require('./app').Run;

var APP2 = {
	scheduleJob : function(){
		rule = '05/60 * * * *';
		var job = schedule.scheduleJob(rule,function(){
			console.log("Pling!!! Bankcard");
			task('Bankcard');
		});
	},

	init: function(){
		APP2.scheduleJob();
	}
};

(function(){
	APP2.init();
})();
