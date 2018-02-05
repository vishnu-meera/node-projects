var oracledb = require('oracledb'); 


oracledb.getConnection({  
     user: "pysh_readonly",  
     password: "wl2leepq8s7j",  
     connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
}, function(err, connection) {  
     if (err) {  
          console.error(err.message);  
          return;  
     }  
     //connection.execute( "select count(*) from event_log where event_start_time between to_date('20170724 00000','yyyymmdd HH24MISS') and to_date('20170725 000000','yyyymmdd HH24MISS') and status = 'failure'",  
     connection.execute(`Select hostname,event_call_type,status,count(*)
from EVENT_LOG
where EVENT_SYSTEM = 'Gift Card Web Service'
and EVENT_CALL_TYPE <> 'Ping'
and event_start_time >= TO_date('2017-08-22 10:35:00', 'SYYYY-MM-DD HH24:MI:SS')
group by hostname,event_call_type,status
order by hostname,event_call_type`,
     [],  
     function(err, result) {  
          if (err) {  
               console.error(err.message);  
               doRelease(connection);  
               return;  
          }  
          console.log(result.metaData);  
          console.log(result.rows[0][0]);  
          doRelease(connection);  
     });  
}); 

function doRelease(connection) {  
     connection.release(  
          function(err) {  
               if (err) {console.error(err.message);}  
          }  
     );  
}  