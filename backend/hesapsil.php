<?php 

require("sistem/baglan.php");
echo json_encode($_POST["id"]);
if(isset($_POST["id"])){
    $gelenid = $_POST["id"]; 
    $sil = $db -> prepare("DELETE FROM hesaplar  WHERE id=?");
    $sil -> execute(array($gelenid));

    //header( "refresh:5;url=gruplistesi.php" );
    if($sil -> rowCount()){
        $mesaj = "basarili";
        echo json_encode($mesaj);
        
        
    }else{
        $mesaj = "basarisiz";
        echo json_encode($mesaj);
        
    }
}




?>