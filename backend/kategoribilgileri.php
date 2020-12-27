<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from kategoriler")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>