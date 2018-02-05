SELECT
  *
FROM
  (SELECT
    TRANSACTION_REFERENCE_ORDER_ID AS ORDER_ID ,
    CASE
      WHEN CREATED_BY = 'Bankcard Authorization'
      THEN 'Auth'
      WHEN CREATED_BY = 'Authorization Reversal'
      THEN 'Reversal'
    END                                                                                                                                                                                                                                AS CALL_TYPE ,
    AUTHORIZATION_ON                                                                                                                                                                                                                   AS AUTH_DATE ,
    COALESCE(TO_CHAR(TO_TIMESTAMP(SUBSTR((REGEXP_SUBSTR(REI_BANKCARD_MESSAGE , '@(.*)' , 1 , 1 , 'i' , 1)) , INSTR((REGEXP_SUBSTR(REI_BANKCARD_MESSAGE , '@(.*)' , 1 , 1 , 'i' , 1)) , ':') + 1) , 'HH24/MI/SS') , 'HH:MMAM') , 'Nil') AS AUTH_TIME ,
    AUTHORIZATION_REQUEST_AMT                                                                                                                                                                                                          AS AMOUNT ,
    CASE
      WHEN AUTHORIZATION_RESPONSE_MESSAGE LIKE '%Approve%'
      THEN 'Approved'
      WHEN AUTHORIZATION_RESPONSE_MESSAGE LIKE '%Decline%'
      THEN 'Declined'
      WHEN AUTHORIZATION_RESPONSE_MESSAGE LIKE '%Failure%'
      THEN 'Declined'
      WHEN AUTHORIZATION_RESPONSE_MESSAGE LIKE '%Invalid%'
      THEN 'Declined'
      ELSE 'Declined'
    END                                                                                                                  AS AUTH_MSG ,
    COALESCE(AUTHORIZATION_RESPONSE_CODE , '00')                                                                         AS AUTH_CODE ,
    REPLACE(COALESCE(REGEXP_SUBSTR(REI_BANKCARD_MESSAGE , 'description:\s(.*)\)' , 1 , 1 , 'i' , 1) , 'Nil') , ' ' , '') AS BANKCARD_MSG ,
    COALESCE(RETRIEVAL_REFERENCE_NUMBER , 'Nil')                                                                         AS REF_NUMBER ,
    COALESCE(SUBSTR(CARD_TOKEN_ID , 1 , 6) , 'Nil')                                                                      AS CARD_TOKEN
  FROM
    BANKCARD_TRANSACTIONS
  WHERE
    TRANSACTION_REFERENCE_ORDER_ID IN ('A125527564', 'A125529265', 'A125529819', 'A125531039', 'A125532510', 'A125532769', 'A125535271', 'A125535519', 'A125537457', 'A125538182', 'A125538346', 'A125538529', 'A125538797', 'A125539007', 'A125539058', 'A125539084', 'A125539090', 'A125540138', 'A125540853', 'A125541737', 'A125541768', 'A125542189', 'A125542532', 'A125543117', 'A125544559', 'A125544890', 'A125545033', 'A125545084', 'A125545660', 'A125545690', 'A125546556', 'A125546925', 'A125547631', 'A125547990', 'A125548156', 'A125549003', 'A125549272', 'A125549462', 'A125550470', 'A125551333', 'A125552356', 'A125552443', 'A125552563', 'A125552839', 'A125553049', 'A125553134', 'A125553788', 'A125553990', 'A125554098', 'A125554115')
  
  UNION
  
  SELECT
    ORDERID            AS ORDER_ID ,
    'Settle'           AS CALL_TYPE ,
    PROCESSEDDATE      AS AUTH_DATE ,
    'Nil'              AS AUTH_TIME ,
    TENDERAMOUNT / 100 AS AMOUNT ,
    CASE
      WHEN STATUS IN ('R' , 'P')
      THEN 'Settled'
      ELSE 'NotSettled'
    END                                        AS AUTH_MSG ,
    '00'                                       AS AUTH_CODE ,
    'Nil '                                     AS BANKCARD_MSG ,
    COALESCE(RETRIEVALREFERENCENUMBER , 'Nil') AS REF_NUMBER,
    COALESCE(SUBSTR(TOKEN , 1 , 6) , 'Nil') AS CARD_TOKEN
  FROM
    SETTLEMENT
  WHERE
    ORDERID IN  ('A125496339', 'A125496481', 'A125496763', 'A125497183', 'A125497295', 'A125497545', 'A125497569', 'A125499937', 'A125499997', 'A125500007', 'A125500054', 'A125500349', 'A125500416', 'A125500929', 'A125501437', 'A125501491', 'A125501616', 'A125501627', 'A125502551', 'A125503001', 'A125503446', 'A125503507', 'A125504841', 'A125504933', 'A125505005', 'A125505332', 'A125505353', 'A125505385', 'A125505388', 'A125505641', 'A125506056', 'A125506283', 'A125506683', 'A125507217', 'A125507566', 'A125508683', 'A125508686', 'A125509014', 'A125509798', 'A125509829', 'A125510048', 'A125510308', 'A125510786', 'A125510803', 'A125511042', 'A125518268', 'A125519524', 'A125520325', 'A125520812', 'A125523796', 'A125526090')
  )
ORDER BY
  ORDER_ID ,
  AUTH_DATE ASC ,
  AUTH_TIME ASC