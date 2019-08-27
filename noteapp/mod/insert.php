<?php
/**
 * Created by PhpStorm.
 * User: vishnu
 * Date: 02-12-2015
 * Time: 17:17
 */

try{

    if(
        empty($_POST['item']) || empty($_POST['qty']) || empty($_POST['type'])
    )
    {
        throw new PDOException("Invalid request");
    }

    $item = $_POST['item'];
    $qty = $_POST['qty'];
    $type = $_POST['type'];

    $objPDO = new PDO('sqlite:../dbase/shopping-list');
    $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO `items` (`id`,`item`,`qty`,`type`) VALUES (null, ?, ?, ?)";

    $statement = $objPDO->prepare($sql);

    if(!$statement->execute(array($item,$qty,$type))){
        throw new PDOException("Error while inserting the record");
    }

    $id = $objPDO->lastInsertId();

    $sql = "SELECT `i`.*,
            `t`.`name` AS `type_name`
            FROM `items` `i`
            JOIN `types` `t`
              ON `t`.`id`=`i`.`type`
            WHERE `i`.`id`=?";

    $statement = $objPDO->prepare($sql);

    if(!$statement->execute(array($id))){
        throw new PDOException("Error while fetching the last inserted record");
    }

    $statement->setFetchMode(PDO::FETCH_ASSOC);

    $item=$statement->fetch();

    echo json_encode(array(
        'error'=>false,
        'item'=>$item
    ),JSON_HEX_TAG|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_HEX_AMP);


}catch (PDOException $e){

    echo json_encode(array(
        'error'=>true,
        'message'=>$e->getMessage()
    ),JSON_HEX_TAG|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_HEX_AMP);

}