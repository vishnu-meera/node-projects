const queryObject								= {};

queryObject.offline							= 	`select * from Globalstore.[REICORPNET\\vsanka2].fn_OfflineCount(0)`

queryObject.online							=	`select * from Globalstore.[REICORPNET\\vsanka2].fn_OnlineCount(0)`
	
queryObject.TimeWiseSplit					=	`select * from Globalstore.[REICORPNET\\vsanka2].fn_creditofflineonlinecount(default,default,default)`

queryObject.StoreWiseSplit					=	`select * from Globalstore.[REICORPNET\\vsanka2].fn_StoreWithCreditOffline(default,default)`

exports.queryObject = queryObject;