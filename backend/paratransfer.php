<?php 

require("sistem/baglan.php");

if(isset($_POST["id"])){
    
    $id = $_POST["id"];
    $yeniBakiye = $_POST["yenibakiye"];

    $guncelle = $db -> prepare("UPDATE hesaplar SET bakiye=? WHERE id=?");
    $guncelle -> execute(array($yeniBakiye,$id));

    if($guncelle-> rowCount()){
        $mesaj = "başarılı";
        echo json_encode($mesaj);
    }else{
        $mesaj = "başarısız";
        echo json_encode($mesaj);
    }

}
?>