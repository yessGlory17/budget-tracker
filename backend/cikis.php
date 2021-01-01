<?php 

session_start();

if(session_destroy()){
    $mesaj = true;
    echo json_encode($mesaj);
}else{
    $mesaj = false;
    echo json_encode($mesaj);
}



?>