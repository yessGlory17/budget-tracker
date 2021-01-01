<?php
require_once("sistem/baglan.php");
//echo "get bulundu";


session_start(); 
    
if(isset($_SESSION["kullanici"])){
    $mesaj = true;
    echo json_encode($mesaj);
}else{
    $mesaj = false;
    echo json_encode($mesaj);
}




?>