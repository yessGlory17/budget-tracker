<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from gelirler WHERE  tarih BETWEEN NOW() - INTERVAL 7 DAY AND NOW()")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>