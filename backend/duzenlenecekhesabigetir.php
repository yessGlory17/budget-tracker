<?php 
require("sistem/baglan.php");

$id = $_POST["id"];

$list = $db-> query("SELECT * from hesaplar WHERE id=$id")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>