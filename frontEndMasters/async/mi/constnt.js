Date.prototype.yyyymmdd = function(){
    return [    
			this.getFullYear(),
			((this.getMonth() + 1 > 9 ? '' : 0) + (this.getMonth() + 1).toString()),
			((this.getDate() > 12 ? '' : 0) + this.getDate().toString())
           ].join('');
}


const ConstObject 				= {};
ConstObject.DBConnect 			= require('edge-js');
ConstObject.connectionString 	= "Server=RMAPRODDB;Integrated Security=SSPI;Database=SalesODS;"
ConstObject.Days 				= 9
ConstObject.payPalPath				= `C:\\Users\\vsankar\\Desktop\\PayPalOrders.xlsx`
ConstObject.getPrviousStartDate = function(){
	let d = new Date();
	d.setDate(d.getDate() - ConstObject.Days);
	 return d.yyyymmdd()
}

ConstObject.payPalmailOptions 				= {
											from :  'vsankar@rei.com',
											to : 'vsankar@rei.com',
											subject: `PayPal orders returned @ POS report : Past week`, 
											html: "Hi All,<br><br>The attached excel contains returns orders processed at POS where the original tender is PayPal.<br>The data is from  past week.<br><br>Thanks,<br>Vishnu",
											attachments:  [
									              {
									                  filename: "PayPalOrders.xlsx",
									                  filePath: ConstObject.payPalPath,
									              }
									            ]
											};

ConstObject.payPalHeaders			=   [{ header: 'STORE', key: 'store_id', width: 7 },
									    { header: 'REGISTER', key: 'register_id', width: 13 },
									    { header: 'TRANSACTION NUMBER', key: 'register_txn_id', width: 24},
									    { header: 'TRANSACTION DATE', key: 'txn_date', width: 23 },
									    { header: 'TENDER', key: 'tender_type', width: 14 },
									    { header: 'AMOUNT', key: 'return_amount', width: 10},
										{ header: 'ORDER', key: 'order_id', width: 16 },
									    { header: 'ORIGINAL SALE DATE', key: 'Original_sale_date', width: 23 }];
									    
ConstObject.paypalSheetName			= 'PayPal'
ConstObject.GetPayPalQReturnsINPosQuery = function(startDate,numberOfDays){
	return `DECLARE @reportDate datetime
			Declare @n integer
			Select @reportDate = CONVERT(datetime, '${startDate}'), @n=${numberOfDays}
			;WITH CTE as 
				(
					select 
						distinct
						t.txn_id,
						t.store_id,
						t.register_id,
						t.register_txn_id ,
						t.txn_date,
						txl.original_order_id,
						tt.tender_amount ,
						tt.tender_type,
						tt.account_number,
						tt.token_type 
					from 
						SalesODS.dbo.txn t WITH(INDEX(idx_txn_uspPaypalOrdersForWeek))
						inner join SalesODS.dbo.txn_line_item txl WITH(INDEX(idx_txn_line_item_uspPaypalOrdersForWeek))
							on t.txn_id = txl.txn_id
						inner join SalesODS.dbo.txn_payment tp 
							on tp.txn_id=t.txn_id
						inner join SalesODS.dbo.txn_tender tt 
							on tp.txn_payment_id=tt.txn_payment_id
					where 
						t.created_by = 'SODS_POS' 
						and txl.created_by = 'SODS_POS' 
						and order_source = 'POS'
						and txn_type=3
						and return_item=1
						and t.txn_date >= @reportDate and t.txn_date <=DATEADD(dd,@n,@reportDate)
						and txl.original_order_id is not null
						and org_txn_mapped=1
				),CTE2 as
				(
					select 
						distinct 
						t.txn_id as Original_txn_id,
						t.order_id,
						t.txn_date as Original_sale_date,
						te.store_id,
						te.register_id, 
						te.register_txn_id,
						te.txn_date,
						te.tender_type , 
						te.tender_amount
					from 
						SalesODS.dbo.txn t	
						inner join SalesODS.dbo.txn_payment tp 
							on tp.txn_id=t.txn_id
						inner join SalesODS.dbo.txn_tender tt 
							on tp.txn_payment_id=tt.txn_payment_id
						inner join CTE te
							on t.order_id=te.original_order_id
					where 
						tt.tender_type=60
						and order_id is not null
						and t.txn_type=0
				)
				select
					store_id,
					register_id,
					register_txn_id,
					txn_date,
					(
						case tender_type
							when 2 then 'DIVIDEND'
							when 3 then 'MDSE RETN REDEEMED'
							when 7 then 'BANKCARD'
							when 8 then 'CASH'
							when 15 then 'MDSE RETN ISSUED'
							when 17 then 'BANKCARD REFUND'
							when 19 then 'CHECK REQUEST'
							when 22 then 'GIFT CERTIFICATE'
							when 25 then 'GIFT CARD'
							when 50 then 'DEBIT CARD'
							when 51 then 'DEBIT CARD REFUND'
						end
					) 
					as tender_type,
					tender_amount*-1 as return_amount,
					order_id,
					Original_sale_date
				from CTE2
				order by 
					txn_date,store_id`;
}

module.exports = ConstObject;