<?php 
require("sistem/baglan.php");


//Burada Sayıyı Dinamik olarak göndermeyi planlıyorum.
$list = $db-> query("SELECT * FROM hareketler WHERE  tarih BETWEEN NOW() - INTERVAL 30 DAY AND NOW()")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($list);




?>