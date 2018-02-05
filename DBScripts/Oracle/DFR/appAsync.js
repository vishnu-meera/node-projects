const oracledb            = require('oracledb'); 
Date.prototype.YYYY_mm_dd = function(dd = this.getDate()){
     let mm = this.getMonth()+1;

     return [this.getFullYear(),
               (mm>9 ? '' : 0) + mm,
               (dd>9 ? '' : 0) + dd].join('-')
}

const date          = new Date();
const DFRdate       = date.YYYY_mm_dd(process.argv[2])

const config        = {  
                         user: "pysh_readonly",  
                         password: "wl2leepq8s7j",  
                         connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
                    }
const query         = `select count(*) from CHASE_DFR_FIN10REC where trunc(REPORT_DATE_FROM) = trunc(to_date('${DFRdate}', 'YYYY-mm-dd'))`

const readOracleDb = function(){
     oracledb.getConnection(config, function(err, connection) {  
               if (err) {  
                    reject(err); 
               }  
               connection.execute(query,[],function(err, result) {  
                    if (err) {  
                         reject(err) 
                    }  
                    let count = Number(result.rows[0][0])
                    resolve(count);
                    doRelease(connection);  
               });  
     }); 
}

function doRelease(connection) {  
     connection.release(  
          function(err) {  
               if (err) {console.error(err.message);}  
          }  
     );  
}  

readOracleDb().then(count=>{
     if(count===0){
          console.log("0 Rows, DFR should load");
     }else{
          console.log(`${count} rows there,exit app`);
          return;
     }
}).catch(console.err)
