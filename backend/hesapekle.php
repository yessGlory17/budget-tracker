<?php 

require("sistem/baglan.php");
date_default_timezone_set('Europe/Istanbul');
setlocale(LC_TIME,'turkish'); //turkceyi sec (sunucuda yüklü olması gerekir)

if(isset($_POST["hesapadi"]) && isset($_POST["miktar"]) && isset($_POST["parabirimi"]) && isset($_POST["hesapturu"])){
    session_start();
    echo "post tespit edildi";
    $hesapadi = $_POST["hesapadi"];
    $miktar = $_POST["miktar"];
    $paraBirimi = $_POST["parabirimi"];
    $hesapturu = $_POST["hesapturu"];
    //echo $baslik + $icerik + $etiketler;
    $ekle = $db -> prepare("INSERT INTO hesaplar SET hesapadi=?, bakiye=?, parabirimi=?, tur=?");
    $ekle -> execute(array($hesapadi,$miktar,$paraBirimi,$hesapturu));
                
                
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