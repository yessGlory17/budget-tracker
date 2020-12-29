<?php 

require("sistem/baglan.php");
date_default_timezone_set('Europe/Istanbul');
setlocale(LC_TIME,'turkish'); //turkceyi sec (sunucuda yüklü olması gerekir)

if(isset($_POST["islem"])){
    session_start();
    $islem = $_POST["islem"];
    $miktar = $_POST["miktar"];
    $kategori = $_POST["kategori"];
    $tarih = date("Y-m-d");
    //echo $baslik + $icerik + $etiketler;
    $ekle = $db -> prepare("INSERT INTO hareketler SET islem=?, miktar=?, kategori=?, tarih=?");
    $ekle -> execute(array($islem, $miktar,$kategori, $tarih));
                
                
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