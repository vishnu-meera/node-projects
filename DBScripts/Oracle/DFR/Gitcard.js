const oracledb            = require('oracledb'); 
const moment              = require('moment');
var tohour                = moment().format('YYYY-MM-DD HH-mm-ss')
var fromhour              = moment().add(-2,'hour').format('YYYY-MM-DD HH-mm-ss')



const readOracleDb = function(){
     return new Promise (function(resolve,reject){
          oracledb.getConnection(config, function(err, connection) {  
                    if (err) {  
                         reject(err); 
                    }  
                    connection.execute(query,[],function(err, result) {  
                         if (err) {  
                              reject(err) 
                         }  
                         resolve(result.rows);
                         doRelease(connection);  
                    });  
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

readOracleDb().then((result)=>{
     for (var i = 0; i < result.length; i++) {
          console.log(result[i][0],'--',result[i][1],'--',result[i][2])
     }
}).catch(console.err)
