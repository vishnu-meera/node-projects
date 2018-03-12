Date.prototype.getPySHDateTime = function(hour=0){

    return     [    
                    this.getFullYear(),
                    ((this.getDate() > 9 ? '' : 0) + this.getDate().toString()),
                    ((this.getMonth() > 12 ? '' : 0) + this.getMonth().toString())
               ].join('-') + 
               " " + 
               [this.getHours()-hour,this.getMinutes(),this.getSeconds()].join(':');
}

const oracledb      =    require('oracledb');
const moment        =    require('moment');
const config        =    {  
                              user: "pysh_readonly",  
                              password: "wl2leepq8s7j",  
                              connectString: "rappp-db.rei.com:30032/pysh.rei.com"  
                         };
const webservises   =    ['Gift Card Web Service','Chase','PayPal','PayPal Web Service', 
                         'Bankcard Web Service','Verifone','Dividend Web Service','Accertify', 
                         'TAM Dividend Service','SVS', 'Database','Fraud Web Service'];

const quiries       =    webservises.map(function(webservice){
                              let d = new Date();

                              return    `Select event_call_type,status,count(*) as countOf
                                   from EVENT_LOG
                                   where EVENT_SYSTEM = '${webservice}'
                                   and event_start_time >= TO_date('${d.getPySHDateTime(2)}', 'SYYYY-MM-DD HH24:MI:SS')
                                   and event_start_time <= TO_date('${d.getPySHDateTime()}', 'SYYYY-MM-DD HH24:MI:SS')
                                   group by event_call_type,status
                                   order by status,event_call_type,countOf`
                         });

function getPySHConnection(resolve,reject){
     oracledb.getConnection(config, function(err, connection) {  
          if (err) {  
               reject(err) 
               return;  
          }  
          resolve(connection);
     }); 
}

function executeQuery(connection,query,resolve,reject){
     connection.execute(query,[],function(err, result) {  
          if(err){
               reject(err)
               return;
          }
          resolve(result);
     });       
}

function outPutResult(result){
     console.log(result)
}

function getPySHConnectionPromise(){
     return new Promise(function executor(resolve,reject){
          getPySHConnection(resolve,reject);
     });
}

function executeQueryPromise(connection,query){
     return new Promise(function executor(resolve,reject){
          executeQuery(connection,query,resolve,reject)
     });
}

const connect =  getPySHConnectionPromise();

connect
     .then(function(connection){

          const q1 = executeQueryPromise(connection,query1);
          const q2 = executeQueryPromise(connection,query2);
          const q3 = executeQueryPromise(connection,query2);
          const q4 = executeQueryPromise(connection,query2);

          q1
          .then(outPutResult)
          .then(function(){
               return q2
          })
          .then(outPutResult)
          .then(function(){
               return q3
          })
          .then(outPutResult)
          .then(function(){
               return q4
          })
          .then(outPutResult)

     });




