const {
    Aborter,
    BlobURL,
    BlockBlobURL,
    ContainerURL,
    ServiceURL,
    StorageURL,
    SharedKeyCredential,
    downloadBlobToBuffer,
    TokenCredential 
  } = require("@azure/storage-blob");
  
  const config  = require('./config.js');
  const avro = require('avsc');
  const fs = require('fs');
  const save = require('save-file');

  const crc32 = require('buffer-crc32');
  const snappy = require('snappy');

function cb(item, itme2){
    console.log("item====>", item);
    console.log("item====>", item2);
    
}

async function main(context) {
  
    // Use SharedKeyCredential with storage account and account key
    const sharedKeyCredential = new SharedKeyCredential(config.accountName, config.key);
  
    // Use TokenCredential with OAuth token
    const tokenCredential = new TokenCredential("token");
    tokenCredential.token = "renewedToken"; // Renew the token by updating token field of token credential
  
    // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
    const pipeline = StorageURL.newPipeline(sharedKeyCredential);
  
    // List containers
    const serviceURL = new ServiceURL(
      // When using AnonymousCredential, following url should include a valid SAS or support public access
      `https://${config.accountName}.blob.core.windows.net`,
      pipeline
    );

    const containerURL = ContainerURL.fromServiceURL(serviceURL, config.containername);
    let containerList = [];
    // List blobs
    marker = undefined;
    do {
        const listBlobsResponse = await containerURL.listBlobFlatSegment(
        Aborter.none,
        marker
        );

        marker = listBlobsResponse.nextMarker;
        for (const blob of listBlobsResponse.segment.blobItems) {
            context.log(`Blob: ${blob.name}`);
            containerList.push(blob.name);
        }
    } while (marker);

    const blobURL = BlobURL.fromContainerURL(containerURL, containerList[containerList.length-2].toString());
    //TNSIoTHub124/00/2019/04/12/19/49
    //const blobURL = BlobURL.fromContainerURL(containerURL, "TNSIoTHub124/00/2019/04/12/19/49");
    const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);


    const downloadBlockBlobResponse = await blobURL.download(Aborter.none, 0);
    const avroResponse  =  await streamToString(downloadBlockBlobResponse.readableStreamBody,context);
    //context.log("avroResponse ===> ", downloadBlockBlobResponse);

    return avroResponse[1].toString();
  }
  
  async function streamToString(readableStream,context) {
    
    
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", data => {
            const type = avro.Type.forSchema({"type":"record","name":"EventData","namespace":"Microsoft.ServiceBus.Messaging","fields":[{"name":"SequenceNumber","type":"long"},{"name":"Offset","type":"string"},{"name":"EnqueuedTimeUtc","type":"string"},{"name":"SystemProperties","type":{"type":"map","values":["long","double","string","bytes"]}},{"name":"Properties","type":{"type":"map","values":["long","double","string","bytes","null"]}},{"name":"Body","type":["null","bytes"]}]});
            
            try {
                chunks.push(type.fromBuffer(data).toString());
            } catch (error) {
                context.log("============>", error.message)
                chunks.push(data)
            }
        });
        readableStream.on("end", () => {
            context.log("============>", chunks.length,chunks[0].length)
            resolve(chunks);
        });
        readableStream.on("error", reject);
    });
}

  
  module.exports = async function (context, req) {
  
    let lastblobname = await main(context);
    // await save(lastblobname.toString(), 'temp1.avro')

    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + lastblobname.toString()
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
  };