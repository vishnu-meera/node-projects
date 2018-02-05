const edge 						= 	require('edge');

const dbCall					=   {};

const connection 		 		=	"Server=wlvaprpldb01sv;Integrated Security=SSPI;Database=GlobalSTORE;"
const localConnection 		 	=	"Server=PC0BAJRP;Integrated Security=SSPI;Database=Temp;"

const sqlDebitMismatch			= 	`EXEC GlobalSTORE.[REICORPNET\\vsanka2].uspGetSuggestedTenderDebitWrongTokenData`
const sqlDebitMisCount			= 	`EXEC GlobalSTORE.[REICORPNET\\vsanka2].uspGetSuggestedTenderDebitWrongTokenCount`
const spGenerateTaxAuditReprt	= 	`EXEC sp_GenerateTaxAuditReport`

const sqlRegisterWiseSAF		= 	`select * from GlobalSTORE.[REICORPNET\\vsanka2].[fn_RegisterWiseSAFdetails](0) order by STR_ID, rgst_id`

dbCall.getSpCount 				= 	edge.func('ms-sql', { connectionString : connection, source:  sqlDebitMisCount, commandTimeout : 0});
dbCall.getSpData 				= 	edge.func('ms-sql', { connectionString : connection, source:  sqlDebitMismatch, commandTimeout : 0});

dbCall.generateTaxAuditReprt 	= 	edge.func('ms-sql', { connectionString : localConnection, source:  spGenerateTaxAuditReprt, commandTimeout : 0});

dbCall.getRegisterWiseSAF 		= 	edge.func('ms-sql', { connectionString : connection, source:  sqlRegisterWiseSAF, commandTimeout : 0});

exports.functs = dbCall;
