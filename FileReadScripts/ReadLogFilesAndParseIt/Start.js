var task 		= require('./productSearch').RunTask;
/*var cron 		= require('node-cron');
 
cron.schedule('00 32 12 * * 0-7', function(){
  	console.log('running a task every minute');
  	task();
});*/


/*var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 40 12 * * 1-7',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     
     task();
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});
job.start();*/

task();