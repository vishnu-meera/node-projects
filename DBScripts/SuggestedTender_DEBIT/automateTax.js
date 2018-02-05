const schedule  			= require('node-schedule')
const runTaxReport			= require('./taxAuditApp').RunApp
const TAXAPP = {
	scheduleTaxJob : function(){
		let rule = '0 2 1 APR,JUL,OCT,JAN *';
		//let rule ='0 */2 * APR,JUL,SEP,JAN *'
		let job = schedule.scheduleJob(rule,function(){
			console.log("Pling!!!\n");
			runTaxReport();
		});
	},

	init: function(){
		TAXAPP.scheduleTaxJob();
	}
};

(function(){
	TAXAPP.init();
})();