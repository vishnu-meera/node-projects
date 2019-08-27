<?php
/**
 * Created by PhpStorm.
 * User: vishnu
 * Date: 02-12-2015
 * Time: 17:17
 */

try{

    if(
        empty($_POST['id'])
    )
    {
        throw new PDOException("Invalid request");
    }

    $id = $_POST['id'];
    $done = empty($_POST['done']) ? 0 : 1;

    $objPDO = new PDO('sqlite:../dbase/shopping-list');
    $objPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE `items` SET `done` = ? WHERE `id` = ?";

    $statement = $objPDO->prepare($sql);

    if(!$statement->execute(array($done,$id))){
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