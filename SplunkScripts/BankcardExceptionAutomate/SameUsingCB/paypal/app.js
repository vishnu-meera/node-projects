const EventEmmitter		= require('events');
class MyEmitter extends EventEmmitter {}

const mail 				=	require('./mail').mailObj;
const configs			=	require('./config').configObj;
const splunkjs 			=	require('splunk-sdk')
const oracledb          = 	require('oracledb'); 
const splunk 			= 	configs.splunk
const db				=	configs.db;
const service 			= 	new splunkjs.Service(splunk.config);
const myEmitter 		=	new MyEmitter();

let getBody				=	mail.getCss();
let temp				= 	0;
let exceptionCount		=	0;

myEmitter.on('event', function(system,body,count){
	temp+=1
	getBody+=body
	if(count){
		console.log('Exception count for the hour: ',count);
		exceptionCount = count
	}
	
	if(temp===4){
		let subject = '';

		subject = exceptionCount >= 50 ? `Action : Req / ${system} Report : ${db.getTime('YYYY-MM-DD : h-mm a',0)}` : `${system} Report Last Hour : ${db.getTime('YYYY-MM-DD : h-mm a',0)}`;	
		subject = Number(db.getTime('HH', 0)) === configs.controlHour ? `Consolidated ${system} Report for day : ${db.getTime('YYYY-MM-DD',-1)}` : `${system} Report Last Hour : ${db.getTime('YYYY-MM-DD : h-mm a',0)}`;

		console.log('\Event: ',subject)
		mail.SentMail(getBody,subject,exceptionCount,system);
		temp			= 0;
		exceptionCount 	= 0;
		getBody			= mail.getCss();
		return;
	}
});

const RunQuery = (system,fromhour,tohour,table) =>{
	let msgbody 				= 	'';
	console.log('RunQuery: ', system);
	oracledb.getConnection(db.config)
		.then(function(conn) {
				conn.execute(db.PaymentHubQuery,[system,fromhour,tohour])
			.then(function(result) {
				console.log();
				msgbody += mail.pasrseTableResult(result.rows,db[table]);
				myEmitter.emit('event',system,msgbody);
				return conn.close();
			})
			.catch(function(err) {
				msgbody += mail.pasrseTableError(err,db[table]);
				myEmitter.emit('event',system,msgbody);
				return conn.close();
			});
	  	})
		.catch(function(err) {
			msgbody += mail.pasrseTableError(err,db[table]);
			myEmitter.emit('event',system,msgbody);
		});
}

const callBack = (splunkFormatTable,system) => {
	return function (err,results){
		let msgbodyObj = mail.parseResult(err,results,splunkFormatTable);

		if(splunkFormatTable[0]===`${system} Exception Count: Last Hour`){
			myEmitter.emit('event',system,msgbodyObj['body'],msgbodyObj['count']);
		}else{
			myEmitter.emit('event',system,msgbodyObj['body']);
		}

	}
}

const oneHotSearch = (query,from,now,table,system)=>{
	return service.oneshotSearch(query, { earliest_time: from ,latest_time: now }, callBack(table,system));
}

function Run(system){

	let from 				=  	Number(db.getTime('HH', 0)) === configs.controlHour ? splunk.dayend_time : splunk.earliest_time;
	let now					= 	splunk.latest_time;
	let tohour 				= 	db.getTime('YYYY-MM-DD HH-mm-ss',0)
	let fromhour			=	Number(db.getTime('HH', 0)) === configs.controlHour ? db.getTime('YYYY-MM-DD HH-mm-ss',-24) : db.getTime('YYYY-MM-DD HH-mm-ss',-1)

	console.log('\nRun->',from,now,fromhour,tohour)

	oneHotSearch(splunk[system].xceptionCountQuery,from,now,splunk[system].xceptionCountTable,system);
	oneHotSearch(splunk[system].xceptionTypeQuery,from,now,splunk[system].xceptionTypeTable,system);
	oneHotSearch(splunk[system].trafficCountQuery,from,now,splunk[system].trafficCountTable,system);

	RunQuery(`${system} Web Service`,fromhour,tohour,system)
}

exports.Run  = Run


