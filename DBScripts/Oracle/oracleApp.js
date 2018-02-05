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
     connection.execute("select count(*) from CHASE_DFR_FIN10REC where trunc(REPORT_DATE_FROM) = trunc(to_date('2017-08-15', 'YYYY-mm-dd'))"
     [],  
     function(err, result) {  
          if (err) {  
               console.error(err.message);  
               doRelease(connection);  
               return;  
          }  
          console.log(result.metaData);  
          console.log(result.rows);  
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