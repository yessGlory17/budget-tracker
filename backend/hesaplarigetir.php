<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from hesaplar")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>