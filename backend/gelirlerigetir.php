<?php 
require("sistem/baglan.php");



$list = $db-> query("SELECT * from gelirler WHERE  tarih BETWEEN NOW() - INTERVAL 1 DAY AND NOW()")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>