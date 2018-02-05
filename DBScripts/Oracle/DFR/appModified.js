Date.prototype.YYYY_mm_dd = function(dd = this.getDate(),mm = this.getMonth()+1){

     return [this.getFullYear(), (mm>9 ? '' : 0) + mm, (dd>9 ? '' : 0) + dd].join('-');
}
const oracle     = require('oracledb'); 
const date       = new Date();
const DFRdate    = date.YYYY_mm_dd(process.argv[3],process.argv[2]);
const config     = {  
     user: "pysh_readonly",  
     password: "wl2leepq8s7j",  
     connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
};
const query      = `select count(*) from CHASE_DFR_FIN10REC where trunc(REPORT_DATE_FROM) = trunc(to_date('${DFRdate}', 'YYYY-mm-dd'))`;


oracle.getConnection(config, function(err, connection) {  
     if (err) {  
          console.error(err.message);  
          return;  
     }  
     //console.log(connection);
     connection.execute(query,[],function(err, result) {  
          if (err) {  
               console.error(err.message);  
               doRelease(connection);  
               return;  
          }  
          console.log(result);
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





