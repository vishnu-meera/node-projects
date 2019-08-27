<?php
/**
 * Created by PhpStorm.
 * User: vishnu
 * Date: 02-12-2015
 * Time: 17:17
 */

try{

    if(
        empty($_POST['ids'])
    )
    {
        throw new PDOException("Invalid request");
    }

    $ids = $_POST['ids'];
    $idArray = explode('|',$ids);
    $placeholder = implode(',',array_fill(0,count($idArray),'?'));

    $objPDO = new PDO('sqlite:../dbase/shopping-list');
    $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "DELETE FROM `items`  WHERE `id` IN ({$placeholder})";

    $statement = $objPDO->prepare($sql);

    if(!$statement->execute($idArray)){
        throw new PDOException("Error while inserting the record");
    }

    echo json_encode(array(
        'error'=>false
    ),JSON_HEX_TAG|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_HEX_AMP);

}catch (PDOException $e){

    echo json_encode(array(
        'error'=>true,
        'message'=>$e->getMessage()
    ),JSON_HEX_TAG|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_HEX_AMP);

}