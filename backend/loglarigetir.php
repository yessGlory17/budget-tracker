<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from loggiris ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>