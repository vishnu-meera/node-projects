const schedule  			= require('node-schedule')
const runReport 			= require('./appSAF').RunApp;

const APP = {
	scheduleTaxJob : function(){
		let rule = '*/60 4-23 * * *';
		let job = schedule.scheduleJob(rule,function(){
			console.log("Pling!!!\n");
			runReport();
		});
	},

	init: function(){
		APP.scheduleTaxJob();
	}
};

(function(){
	APP.init();
})();