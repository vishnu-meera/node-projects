const server 			= require('./server');
const router 			= require('./router');
const handlerObj 		= require('./requestHandler').handlerObj;


var handle = {};

handle["/"]						= handlerObj.Online
handle["/Online"] 				= handlerObj.Online
handle["/Offline"] 				= handlerObj.Offline
handle["/TimeWiseSplit"] 		= handlerObj.TimeWiseSplit
handle["/StoreWiseSplit"] 		= handlerObj.StoreWiseSplit

server.start(router.route,handle);