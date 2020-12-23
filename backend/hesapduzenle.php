<?php 

require("sistem/baglan.php");

if(isset($_POST["id"])){
    
    $id = $_POST["id"];
    $hesapadi = $_POST["hesapadi"];
    $bakiye = $_POST["miktar"];
    $parabirimi = $_POST["parabirimi"];
    $tur = $_POST["tur"];

    $guncelle = $db -> prepare("UPDATE hesaplar SET hesapadi=?, bakiye=?,parabirimi=?,tur=? WHERE id=?");
    $guncelle -> execute(array($hesapadi,$bakiye,$parabirimi,$tur,$id));

    if($guncelle-> rowCount()){
        $mesaj = "başarılı";
        echo json_encode($mesaj);
    }else{
        $mesaj = "başarısız";
        echo json_encode($mesaj);
    }

}
?>