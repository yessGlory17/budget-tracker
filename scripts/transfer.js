/*
    Para transferi kısmını bölmemin sebebi; biraz karışık olduğundan kod yazarken kendime yarar sağlamak amaçlıdır.

        -Özgür Kurucan

*/


$(document).ready(function () {


    var transferID = null;
    var transferParaBirimi = null;
    var butce = null;
    var ilkBakiye = null;
    //Hesabın transfer ikonuna tıklanınca transfer formunun gelmesi
    $(document).on("click", "#para-transfer", function () {
        transferID = $(this).parent().attr("id");
        $(".transfer-form-arkaplan").fadeIn(500).css("display", "flex");

        TransferEdecekHesapBilgileriniGetir(transferID);
        HesapIsimleriniGetir();

    });

    //Hesabın trasnfer formunu kapatma ikonuna basılınca formun kaybolması.
    $("#transfer-kapat-icon").on("click", function () {
        $("#transfer-miktar").val("");
        $(".transfer-form-arkaplan").fadeOut(500);

    });


    //Hesap seçimi algılama
    $(document).on("change", ".hesap-secimi", function () {

        var hesap = $(".hesap-secimi :selected").val();
        var bakiye;
        //Transfer edecek hesabın transfer miktarını al.    


        console.log("bakiyee.. : " + bakiye);

        //Seçilen hesabın bakiye bilgisine ulaş.

        //iki sayısı topla ve seçilen hesabın bakiyesini yeni sayıyla güncelle.
    });
    var transferEdenHesapID;
    var alacakHesapID;
    var butonAktifMi = false;
    //İnputa girilen değeri sürekli olarak alıp int'e çevirip bakiyeyle kıyaslayıp, kıyas sonucuna göre işlem yapılacak.
    $(document).on("keyup", "#transfer-miktar", function () {
        //İnput içindeki değeri al.

        var transferMiktar = $("#transfer-miktar").val();
        var hesap = $(".gonderen-hesap-adi").text();

        //Parçala ve sayı kısmını integer'a çevir.

        $.ajax({
            type: "GET",
            url: "backend/hesaplarigetir.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var hesaplar = JSON.parse(response);

                $(hesaplar).each(function (index, item) {
                    if (item["hesapadi"] == hesap) {
                        transferEdenHesapID = item["id"];
                        ilkBakiye = SemboluSil(item["bakiye"]);
                        bakiye = item["bakiye"];
                        console.log("B A K I Y E : " + bakiye);
                        bakiye = SemboluSil(bakiye);
                        bakiye = parseInt(bakiye);

                        transferMiktar = SemboluSil(transferMiktar);
                        transferMiktar = parseInt(transferMiktar);


                        if (transferMiktar > bakiye) {

                            $(".transfer-button").css({
                                'pointer-events': 'none',
                                'opacity': '.3',
                            });
                            alert("Hesabınızda transfer etmek istediğiniz kadar bakiye yok!");
                            $("#transfer-miktar").val("");
                        } else {
                            $(".transfer-button").css({
                                'pointer-events': 'auto',
                                'opacity': '1',
                            });

                            butonAktifMi = true;

                            //Transfer Sorgusunu çalıştır. Ve PAra Ekle

                            //Transfer sorgusunu çalıştır ve para eksilt.
                        }


                    }
                });


            }
        })



        console.log(transferMiktar);
    });


    //Hesabın para birimini al ve bu para biriminin sembolünü inputa ekle.

    $(document).on("click", ".transfer-button", function () {


        var transferMiktar = $("#transfer-miktar").val();
        var hesap = $(".hesap-secimi :selected").val();
        var transferSonuc;
        var hareketMiktar;
        $.ajax({
            type: "GET",
            url: "backend/hesaplarigetir.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var hesaplar = JSON.parse(response);
                var sonBakiye = 0;
                $(hesaplar).each(function (index, item) {
                    if (item["hesapadi"] == hesap) {
                        alacakHesapID = item["id"];
                        bakiye = item["bakiye"];
                        console.log("B A K I Y E : " + bakiye);
                        bakiye = SemboluSil(bakiye);
                        bakiye = parseInt(bakiye);

                        transferMiktar = SemboluSil(transferMiktar);
                        transferMiktar = parseInt(transferMiktar);
                        hareketMiktar = '₺' + transferMiktar;
                        ilkBakiye = parseInt(ilkBakiye);
                        sonBakiye = parseInt(sonBakiye);
                        sonBakiye = ilkBakiye - transferMiktar;
                        sonBakiye = sonBakiye + '';
                        sonBakiye = FindMoneySymbol(item["parabirimi"]) + sonBakiye;
                        transferSonuc = bakiye + transferMiktar;
                        transferSonuc = transferSonuc + '';
                        transferSonuc = FindMoneySymbol(item["parabirimi"]) + transferSonuc;
                        //alert("TransferSonuc : " + transferSonuc);
                        //alert("SonBakiye : " + sonBakiye);
                        //Transfer Ederken para sembolunu ekle

                        //Transfer Sorgusu

                        if (butonAktifMi) {

                            $.ajax({
                                type: "POST",
                                url: "backend/paratransfer.php",
                                data: { id: alacakHesapID, yenibakiye: transferSonuc },
                                dataType: "JSON",
                                success: function (cevap) {
                                    console.log(cevap);
                                    $(".transfer-form-arkaplan").fadeOut(500);

                                    //Para Transferi Hareketi Ekle
                                    HareketEkle("Transfer", hareketMiktar, hesap);
                                    //alert(cevap);
                                },
                                error: function (err) {
                                    console.log(err);
                                }
                            });



                            $.ajax({
                                type: "POST",
                                url: "backend/paratransfer.php",
                                data: { id: transferEdenHesapID, yenibakiye: sonBakiye },
                                dataType: "JSON",
                                success: function (cevap) {
                                    console.log(cevap);
                                    $(".transfer-form-arkaplan").fadeOut(500);
                                    //alert(cevap);

                                    //Para Transferi Hareketi Ekle
                                    // HareketEkle("Transfer", hareketMiktar);
                                },
                                error: function (err) {
                                    console.log(err);
                                }
                            });
                        }

                    }
                });


            }
        })
    });




    //İd ye göre hesap ismini getirme
    function TransferEdecekHesapBilgileriniGetir(gelenID) {
        $.ajax({
            type: "POST",
            url: "backend/duzenlenecekhesabigetir.php",
            data: { id: gelenID },
            dataType: "JSON",
            success: function (cevap) {
                transferParaBirimi = cevap[0]["parabirimi"];
                console.log(FindMoneySymbol(cevap[0]["parabirimi"]))
                console.log(cevap);
                console.log(cevap[0]["hesapadi"]);
                $(".gonderen-hesap-adi").text(cevap[0]["hesapadi"]);
                //alert(cevap);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }


    //Get metoduyla veri tabanından hesap isimlerini alıp dinamik olarak selectbox içerisine ekleme.
    function HesapIsimleriniGetir() {
        $.ajax({
            type: "GET",
            url: "backend/hesaplarigetir.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var hesaplar = JSON.parse(response);

                $(".transfer-edilecek-hesap").remove();

                $(hesaplar).each(function (index, item) {
                    //console.log(item["hesapadi"]);

                    if (item["id"] == transferID) {
                        hesapParaBirimi = item["parabirimi"];
                    }

                    var n = item["bakiye"];
                    console.log("Bakiye : " + n);
                    console.log("Para Sembolu Silinmiş Miktar : " + SemboluSil(item["bakiye"]));


                });

                $(hesaplar).each(function (index, item) {
                    //console.log(item["hesapadi"]);



                    if (item["id"] != transferID) {
                        if (item["parabirimi"] == hesapParaBirimi) {
                            var optionBilgi = item["hesapadi"] + "[" + item["tur"] + "]";
                            var eklenecekOption = '<option class="transfer-edilecek-hesap" value="' + item["hesapadi"] + '">' + optionBilgi + '</option>';

                            $(".hesap-secimi").append(eklenecekOption);
                        }
                    }

                });
            }
        })
    }







    var secilenParaBirimi = null;
    var secilenParaBirimiSembolu = null;
    var ParaBirimleriVeSemboller = '{"TürkLirası" : "₺", "Dolar":"$","Euro":"€","Sterlin":"£"}';
    //Bununla Para Miktarı İnputuna Değer Girilmeye Başlayınca Yazının Başına Paranın Sembolünü Ekliyorum.
    ParaBirimleriVeSemboller = JSON.parse(ParaBirimleriVeSemboller);
    console.log(ParaBirimleriVeSemboller);

    $("#transfer-miktar").keypress(function () {
        var miktar = $("#transfer-miktar").val();
        if (secilenParaBirimiSembolu == null) {
            secilenParaBirimiSembolu = FindMoneySymbol(transferParaBirimi);
        }

        if (miktar.indexOf(secilenParaBirimiSembolu) == -1) {

            var yeniMiktar = secilenParaBirimiSembolu + miktar;
            $("#transfer-miktar").val(yeniMiktar);

            var paraSemboller = ["$", "€", "₺", "£"];
            $(paraSemboller).each(function (index, item) {
                var sonuc = miktar.indexOf(item);
                if (sonuc > -1) {
                    //O kelimenin indexini bulup onun yerine koyulmalı

                    var removeItem = miktar[sonuc];
                    miktar = miktar.replace(removeItem, secilenParaBirimiSembolu);

                    $("#transfer-miktar").val(miktar);
                }
            })

        } else {
            console.log(miktar.indexOf(secilenParaBirimiSembolu));
        }
    });







    function SemboluBul() {
        if (secilenParaBirimi == "Türk Lirası") {
            secilenParaBirimiSembolu = ParaBirimleriVeSemboller.TürkLirası;
        } else if (secilenParaBirimi == "Dolar") {
            secilenParaBirimiSembolu = ParaBirimleriVeSemboller.Dolar;
        } else if (secilenParaBirimi == "Euro") {
            secilenParaBirimiSembolu = ParaBirimleriVeSemboller.Euro;
        } else {
            secilenParaBirimiSembolu = ParaBirimleriVeSemboller.Sterlin;
        }
    }

    function SemboluGuncelle(m, s) {

        var paraSemboller = ["$", "€", "₺", "£"];
        $(paraSemboller).each(function (index, item) {
            var sonuc = m.indexOf(item);
            if (sonuc > -1) {
                //O kelimenin indexini bulup onun yerine koyulmalı
                var removeItem = m[sonuc];

                m = m.replace(removeItem, s);

                $("#transfer-miktar").val(m);


            }
        })

    }


    function FindMoneySymbol(moneyName) {
        if (moneyName == "Türk Lirası") {
            return ParaBirimleriVeSemboller.TürkLirası;
        } else if (moneyName == "Dolar") {
            return ParaBirimleriVeSemboller.Dolar;
        } else if (moneyName == "Euro") {
            return ParaBirimleriVeSemboller.Euro;
        } else {
            return ParaBirimleriVeSemboller.Sterlin;
        }
    }

    function SemboluSil(m) {
        var temiz = null;
        var paraSemboller = ["$", "€", "₺", "£"];
        $(paraSemboller).each(function (index, item) {
            var sonuc = m.indexOf(item);
            if (sonuc > -1) {
                //O kelimenin indexini bulup onun yerine koyulmalı
                var removeItem = m[sonuc];

                m = m.replace(removeItem, "");



                temiz = m;
            }
        })

        return temiz;
    }


    function HareketEkle(islemAdi, miktar, kategori) {
        $.ajax({
            type: "POST",
            url: "backend/hareketekle.php",
            data: { islem: islemAdi, miktar: miktar, kategori: kategori },
            dataType: "JSON",
            success: function (cevap) {
                console.log(cevap);
                console.log("Hareket Eklendi!");
                //alert(cevap);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }


});