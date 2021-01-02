<?php 

require("sistem/baglan.php");
require("sistem/logsistemi.php");
date_default_timezone_set('Europe/Istanbul');
setlocale(LC_TIME,'turkish'); //turkceyi sec (sunucuda yük
if($_POST){
    //echo "test";

    session_start();
    $username = $_POST["email"];
    $password = $_POST["sifre"];
    $kullanicial = $db -> prepare("SELECT * FROM kullanicilar WHERE email=? AND sifre=?");
    $kullanicial -> execute(array($username,$password));
    $kullanici_var_mi = $kullanicial->rowCount();
    if($kullanici_var_mi>0){
        $_SESSION["oturum"] = true;
        $_SESSION["kullanici"] = $username;
        logGiris($_SESSION["kullanici"]);
        $mesaj = true;
        echo json_encode($mesaj);

    }else{

       
       $mesaj = false;
       echo json_encode($mesaj);
       
    }

}


?>