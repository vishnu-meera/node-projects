const edge 						= 	require('edge');
const queryObject				= 	require('./query').queryObject;
const connection 		 		=	"Server=wlvaprpldb01sv;Integrated Security=SSPI;Database=GlobalSTORE;"
const dbCallObj					= 	{};

dbCallObj.OfflineCount 			= 	edge.func('sql', { connectionString : connection, source: queryObject.offline });
dbCallObj.OnlineCount 			= 	edge.func('sql', { connectionString : connection, source: queryObject.online });
dbCallObj.TimeWiseSplit 		= 	edge.func('sql', { connectionString : connection, source: queryObject.TimeWiseSplit });
dbCallObj.StoreWiseSplit 		= 	edge.func('sql', { connectionString : connection, source: queryObject.StoreWiseSplit });


exports.dbCallObj 				= 	dbCallObj;



