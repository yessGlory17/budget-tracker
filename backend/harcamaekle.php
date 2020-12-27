<?php 

require("sistem/baglan.php");

if(isset($_POST["kategori"])){
    
    
    $kategori = $_POST["kategori"];
    $harcama = $_POST["harcama"];

    $guncelle = $db -> prepare("UPDATE kategoriler SET harcama=? WHERE kategori_adi=?");
    $guncelle -> execute(array($harcama,$kategori));

    if($guncelle-> rowCount()){
        $mesaj = "başarılı";
        echo json_encode($mesaj);
    }else{
        $mesaj = "başarısız";
        echo json_encode($mesaj);
    }

}
?>