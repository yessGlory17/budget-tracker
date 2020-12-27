<?php 

require_once("dovizcevir.php");


$DovizKurlari = new DovizKurlari();

// echo " Dolar : ", $DovizKurlari->usd_buy;
// echo " Euro : " , $DovizKurlari->eur_buy;
// echo " Euro : " , $DovizKurlari->gbp_buy;

$sonuc = array("dolar" => $DovizKurlari->usd_buy, "euro" => $DovizKurlari->eur_buy,"sterlin"=>$DovizKurlari->gbp_buy);
echo json_encode($sonuc);
?>