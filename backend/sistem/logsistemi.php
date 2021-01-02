<?php 
/*
##########################################################
#                       Özgür Kurucan                    #
#                       Log Sistemi                      #
#                       10 Mayıs 2020                    #
#            İnter Programcılığı Ödevi için yazıldı      #
##########################################################

*/

include "baglan.php";

 //Kullanıcı ipsini alır
 function Ipgetir(){
    $device_name = gethostbyaddr($_SERVER['REMOTE_ADDR']);
    $ip = gethostbyname ( $device_name );  
    return $ip;
}

//Kullanıcının giriş ve çıkış saatini alır
function tarihSaat(){

    $giriszamani = date('d.m.Y H:i');
    return $giriszamani;
}

//Giriş yapılan kullanıcıyı kaydeder
function logGiris($kullanici){

    
    $log = $GLOBALS['db'] -> prepare("INSERT INTO loggiris SET kullaniciadi=?, giriszamani=?, ip=?");
    $log -> execute(array($kullanici, tarihSaat(), Ipgetir()));
    $id = setLoginUserId();
    //echo "SON ID :".$id;

}

//Çıkış yapan kullanıcıyı kaydeder.
function logCikis(){
    /* 
        Çıkış işleminin yapıldığı ve çıkış işlemi saatinin girislog tablosuna ekleyen fonksiyon
    */
    $ip = Ipgetir();
    $cikiszamani = tarihSaat();
    $loginid = $_SESSION["kullaniciid"];
    //echo "İD : ".$loginid;
    $logout = $GLOBALS['db'] -> exec ("UPDATE loggiris SET cikiszamani = '$cikiszamani'  WHERE id= '$loginid' ");
    //$logout -> execute(array($cikiszamani,$loginid));
    // if($logout){
    //     echo " <script type='text/javascript'>  
		 
    //              alert('Çıkış başarılı'); 
    //               </script>";
    // }

}

//Giriş yapmış bulunan kullanıcının idsini kaydeder.
function setLoginUserId(){
    //session_start();

    //Burada girislogu tablosuna son eklenen yani son giriş yapan kullanıcının idsini session olarak ayarlıyorum
    $lasid = $GLOBALS['db'] -> lastInsertId();
    $_SESSION["kullaniciid"]=$lasid;
    $giriyapmiskullanici = $_SESSION["kullaniciid"];
}

/*------------------------------------İşlem Logları Toplama--------------------------------------------- */

function yapilanIslemLog($kullanici, $islemturu,$islemyapilantablo){

    $islemlog = $GLOBALS['db'] -> prepare("INSERT INTO logislem SET kullanici=?, islemzamani=?, yapilanislem=?,islemtablo=?");
    $islemlog -> execute(array($kullanici,tarihSaat(),$islemturu,$islemyapilantablo));
    
    if($islemlog-> rowCount()){

        echo "Başarılı";
    }else{
        print_r("HATA: ".$islemlog->errorInfo());
    }
}



?>