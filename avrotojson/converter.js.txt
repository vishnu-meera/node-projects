const avro = require('avsc');
const fs = require('fs');
const azure = require('azure-storage');
const tableSvc = azure.createTableService(
                    'tempalert', 
                    'sfUvEXO5Dm3VKDG0vD6FcIiAMEaeCp3nJ57Dz6l4qGtckjYc8AGeKKAgLJuR3BGRu8vBKwk2a49IFNZ4GO/2yg==');
const entGen = azure.TableUtilities.entityGenerator;

const walkSync = function(dir, filelist) {

    if( dir[dir.length-1] != '/') dir=dir.concat('/')
  
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
      }
      else {
        filelist.push(dir+file);
      }
    });
    return filelist;
};

const fileList = walkSync('./2019',[]);
let count=0;

for (const file of fileList) {
    avro.createFileDecoder(file)
    .on('data', function (record) { 
            count++;
            let obj = JSON.parse(record);
            let realDataObj = JSON.parse(obj.Body.bytes);

            let alert = obj.Properties.MessageType ? obj.Properties.MessageType.toString() : "No Alert";
            let batchId = obj.Properties.batchId ? obj.Properties.batchId.toString() : "Id is not available";
            let mTemperature = realDataObj.machine.temperature ? realDataObj.machine.temperature : 0;
            let mPressure = realDataObj.machine.pressure ? realDataObj.machine.pressure : 0;
            let aTemperature = realDataObj.ambient.temperature ? realDataObj.ambient.temperature : 0;
            let aHumidity = realDataObj.ambient.humidity ? realDataObj.ambient.humidity :0;
            let timeCreated = realDataObj.timeCreated ? realDataObj.timeCreated.toString() : Date.now().toString();

            
            let task = {
                PartitionKey: entGen.String('CA_Frenso'),
                RowKey: entGen.String(count.toString()),
                Alert : entGen.String(alert),
                BatchId : entGen.String(batchId),
                MTemperature : entGen.Double(mTemperature),
                MPressure : entGen.Double(mPressure),
                ATemperature : entGen.Double(aTemperature),
                AHumidity : entGen.Double(aHumidity),
                TimeCreated : entGen.DateTime(timeCreated)
              };
            
              //console.log("Task ==>, ", task );

              tableSvc.insertEntity('Hvacdashboatdtable',task, function (error, result, response) {
                if(!error){
                    console.log("Task inserted : ", result);
                    return;
                }

                console.warn("Task Not inserted : ", error);
                return;
              });
    });
}
