const oracledb = require('oracledb'); 

Date.prototype.YYYY_mm_dd = function(dd = this.getDate(),mm = this.getMonth()+1){

     return [this.getFullYear(),
               (mm>9 ? '' : 0) + mm,
               (dd>9 ? '' : 0) + dd].join('-')
}

var date       = new Date();
var DFRdate    = date.YYYY_mm_dd(process.argv[3],process.argv[2])

console.log('DFRdate ',DFRdate,' \n');

oracledb.getConnection({  
     user: "pysh_readonly",  
     password: "wl2leepq8s7j",  
     connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
}, function(err, connection) {  
     if (err) {  
          console.error(err.message);  
          return;  
     }  
          connection.execute(
          `select count(*) from CHASE_DFR_FIN10REC where trunc(REPORT_DATE_FROM) = trunc(to_date('${DFRdate}', 'YYYY-mm-dd'))`,
          [],  
          function(err, result) {  
               if (err) {  
                    console.error(err.message);  
                    doRelease(connection);  
                    return;  
               }  
               let count = Number(result.rows[0][0])
               if(count===0){
                    console.log("0 Rows, DFR should load");
               }else{
                    console.log(`${count} rows there,exit app`);
                    return;
               }
               doRelease(connection);  
          }
     );  
}); 

function doRelease(connection) {  
     connection.release(  
          function(err) {  
               if (err) {console.error(err.message);}  
          }  
     );  
}  


