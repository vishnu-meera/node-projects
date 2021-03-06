const moment 					= 	require('moment');
const PayPal 					=	{};

PayPal.xceptionCountQuery		=	"search host=*ulv*ppysh* source=*catalina* *paypal* *Exception* NOT (WARN OR *taskExecutor*) | table host | stats count by host| sort host"		                    	
PayPal.xceptionTypeQuery		=	"search host=*ulv*ppysh* source=*catalina* *paypal* *Exception* NOT (WARN OR *taskExecutor*) | rex field=_raw (?<field1>Exception:(.*)) |table DEDUP field1 |  stats count by  field1 | SORT -count"		 
PayPal.trafficCountQuery		=	"search host=*ulv*ppysh* source=*catalina* *paypal* NOT (WARN OR *taskExecutor*) | table host | stats count by host| sort host"		 

PayPal.xceptionCountTable		= 	['PayPal Exception Count: Last Hour','Host Name','Count'];
PayPal.xceptionTypeTable		= 	['PayPal Exception Type: Last Hour','Exception Name','Count'];
PayPal.trafficCountTable		= 	['PayPal Traffic Count: Last Hour','Host Name','Count'];


const configObj					=	{};
const splunkObj					=	{};
const dbObj						= 	{};

splunkObj.config 				=	{
										username:"vsankar",
										password:"Splunkae0624",
										scheme:"https",
										host:"rei.splunkcloud.com",
										version:"5.0"
									};

splunkObj.latest_time			=	"now"
splunkObj.earliest_time			= 	"-60m@m";
splunkObj.dayend_time			=	"-24h@h";

dbObj.config					=	{  
										user: "pysh_readonly",  
										password: "wl2leepq8s7j",  
										connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
		                    		};

dbObj.PaymentHubQuery         	= `  Select event_call_type,status,count(*) as countOf
			                         from EVENT_LOG
			                         where EVENT_SYSTEM = :system
			                         and event_start_time >= TO_date(:fromhour, 'SYYYY-MM-DD HH24:MI:SS')
			                         and event_start_time <= TO_date(:tohour, 'SYYYY-MM-DD HH24:MI:SS')
			                         group by event_call_type,status
			                         order by status,event_call_type,countOf`

dbObj.getTime                	= 	function (format,hour) { return moment().add(hour,'hour').format(format) } // YYYY-MM-DD HH-mm-ss , moment().add(-1,'hour').format('YYYY-MM-DD HH-mm-ss')

dbObj.PayPal					= 	['PayPal PaymentHub--EventLog Table: Last Hour','EVENT_CALL_TYPE','Status','Count sucess/failure']

splunkObj.PayPal 				= 	PayPal;


configObj.controlHour			= 	1;
configObj.db 					=	dbObj;
configObj.splunk				=	splunkObj

exports.configObj 				=	configObj;