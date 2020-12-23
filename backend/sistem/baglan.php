<?php
$servername = "localhost";
$username = "root";
$password = "";
$db="butcetakip";

try{
    $db = new PDO("mysql:hos=localhost;dbname=butcetakip;","root","");
    //echo "Bağlandı";
}catch( PDOexception $hata ){
    echo $hata -> getMessage();
}

?>