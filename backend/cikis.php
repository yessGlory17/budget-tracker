<?php 

session_start();
require("sistem/logsistemi.php");
date_default_timezone_set('Europe/Istanbul');
setlocale(LC_TIME,'turkish'); //turkceyi sec (sunucuda yük
if(session_destroy()){
    $mesaj = true;
    
    echo json_encode($mesaj);
    logCikis();
}else{
    $mesaj = false;
    echo json_encode($mesaj);
}



?>