<?php 

require("sistem/baglan.php");

if(isset($_POST["email"])){
    
    $email = $_POST["email"];
    $sifre = $_POST["sifre"];
    
    $guncelle = $db -> prepare("UPDATE kullanicilar SET email=?, sifre=? WHERE email=?");
    $guncelle -> execute(array($email, $sifre, $email));

    if($guncelle-> rowCount()){
        $mesaj = "başarılı";
        echo json_encode($mesaj);
    }else{
        $mesaj = "başarısız";
        echo json_encode($mesaj);
    }

}
?>