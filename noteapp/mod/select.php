<?php
/**
 * Created by PhpStorm.
 * User: vishnu
 * Date: 02-12-2015
 * Time: 17:17
 */

try{

    $objPDO = new PDO('sqlite:../dbase/shopping-list');
    $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT `i`.*,
            `t`.`name` AS `type_name`
            FROM `items` `i`
            JOIN `types` `t`
              ON `t`.`id`=`i`.`type`
            ORDER BY `i`.`date` ASC";

    $result = $objPDO->query($sql);

    if(!$result){
        throw new PDOException("the result has returned no object");
    }

    $result->setFetchMode(PDO::FETCH_ASSOC);

    $items = $result->fetchAll();

    $sql= "SELECT *
           FROM `types`
           ORDER BY `id`";

    $result = $objPDO->query($sql);

    if(!$result){
        throw new PDOException("the result has returned no object");
    }

    $result->setFetchMode(PDO::FETCH_ASSOC);


    $types = $result->fetchAll();

    echo json_encode(array(
        'error'=>false,
        'items'=>$items,
        'types'=>$types
    ),JSON_HEX_TAG|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_HEX_AMP);


}catch (PDOException $e){

    echo json_encode(array(
        'error'=>true,
        'message'=>$e->getMessage()
    ),JSON_HEX_TAG|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_HEX_AMP);

}