var edge 				= 	require('edge');
var connection 		 	=	"Server=wlvaprpldb01sv;Integrated Security=SSPI;Database=GlobalSTORE;"

var offlineQuery		= 	`select COUNT(*) as OfflineCount
							from 
								GlobalSTORE.dbo.REI_POS_SAF Saf with (nolock)
								inner join GlobalSTORE.dbo.TRANS_HEADER th with(nolock)
									on th.STR_ID=saf.STR_ID and th.RGST_TRAN_NBR=saf.RGST_TRAN_NBR and th.RGST_ID=saf.RGST_ID
							WHERE 
								TRAN_END_DTTM between dateadd(day,datediff(day,0,GETDATE()),0) AND dateadd(day,datediff(day,-1,GETDATE()),0)
								and OFFLINE_AUTHDATE between dateadd(day,datediff(day,0,GETDATE()),0) AND dateadd(day,datediff(day,-1,GETDATE()),0)
								and th.VOID_CD=0 and th.TRNING_MDE_FG=0`

var onlineQuery			=	`select count(*) as OnlineCount
							from 
								GlobalSTORE.dbo.TRANS_HEADER th with (nolock)
								inner join GlobalSTORE.dbo.TRANSACTION_TENDER tt  with (nolock)
									on tt.TRAN_ID=th.TRAN_ID and tt.STR_ID=th.STR_ID 
								inner join GlobalSTORE.dbo.TENDER_DETAIL td  with (nolock)
									on tt.TRAN_ID=td.TRAN_ID and tt.STR_ID=td.STR_ID and tt.TRAN_LN_NBR=td.TRAN_LN_NBR 
							where TRAN_END_DTTM between dateadd(day,datediff(day,0,GETDATE()),0) AND dateadd(day,datediff(day,-1,GETDATE()),0)
								and th.RGST_ID not between 49 and 69 
								and th.VOID_CD=0 and th.TRNING_MDE_FG=0
								and tt.TND_CD in (50,51,7,17)
								and td.REI_ACCT_KEY_NAME='CHASE_TOKEN'
								and PAN_TOKEN is not null and PAN_TOKEN<>''
								and not exists (
										select sa.STR_ID,sa.RGST_ID,sa.RGST_TRAN_NBR from GlobalSTORE.dbo.REI_POS_SAF sa with(nolock)
										where th.str_id=sa.STR_ID and th.RGST_ID=sa.RGST_ID and th.RGST_TRAN_NBR=sa.RGST_TRAN_NBR
										and OFFLINE_AUTHDATE between dateadd(day,datediff(day,0,GETDATE()),0) AND dateadd(day,datediff(day,-1,GETDATE()),0))`

var OfflineCount 		= edge.func('sql', { connectionString : connection, source: offlineQuery });
var OnlineCount 		= edge.func('sql', { connectionString : connection, source: onlineQuery });


OfflineCount(null, function(error, result){
    if (error) {
    	console.log(error);
    	return;
    } 
    console.log(result);
});

OnlineCount(null, function(error, result){
    if (error) {
    	console.log(error);
    	return;
    } 
    console.log(result);
});

