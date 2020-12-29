<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from hareketler")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>