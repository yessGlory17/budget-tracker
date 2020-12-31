<?php 

require("sistem/baglan.php");
date_default_timezone_set('Europe/Istanbul');
setlocale(LC_TIME,'turkish'); //turkceyi sec (sunucuda yüklü olması gerekir)

if(isset($_POST["geliradi"])){
    session_start();
    $geliradi = $_POST["geliradi"];
    $gelirmiktar = $_POST["gelirmiktar"];
    $gelirhesap = $_POST["gelirhesap"];
    $tarih = date("Y-m-d");
    //echo $baslik + $icerik + $etiketler;
    $ekle = $db -> prepare("INSERT INTO gelirler SET geliradi=?, gelirmiktar=?, gelirhesap=?,tarih=?");
    $ekle -> execute(array($geliradi, $gelirmiktar,$gelirhesap, $tarih));
                
                
    if($ekle -> rowCount()){
        //echo $ekle -> rowCount();
        $res = "Veri Eklendi!";
        echo $res;
        //echo json_encode($res);
    } else{
        $error = "Hata var!";
        echo json_encode($error);
    }


}



?>