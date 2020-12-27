
<?php
 
    class DovizKurlari {
        private $tcmb = "http://www.tcmb.gov.tr/kurlar/today.xml";
        private $conn;
 
        public $usd_buy;
        public $usd_sell;
        
        public $eur_buy;
        public $eur_sell;
 
        public function __construct(){
            $this->conn = simplexml_load_file($this->tcmb);
            $this->USD_Data();
            $this->EUR_Data();
            $this->GBP_Data();
        }
 
        public function USD_Data(){
            $this->usd_buy = $this->conn->Currency[0]->BanknoteBuying;
            $this->usd_sell = $this->conn->Currency[0]->BanknoteSelling;
        }
 
        public function EUR_Data(){
            $this->eur_buy = $this->conn->Currency[3]->BanknoteBuying;
            $this->eur_sell = $this->conn->Currency[3]->BanknoteSelling;
        }

        public function GBP_Data(){
            $this->gbp_buy = $this->conn->Currency[4]->BanknoteBuying;
            $this->gbp_sell = $this->conn->Currency[4]->BanknoteSelling;
        }
 
    }
 
?>