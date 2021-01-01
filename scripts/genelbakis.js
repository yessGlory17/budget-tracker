$(window).on("load", function () {

    GelirleriGetir();
    GiderleriGetir();
    $(".gelir-goster-button").click(function () {
        $(".giderler-panel").fadeOut(500).css("display", "none");
        $(".gelirler-panel").fadeIn(500).css("display", "flex");
        $("p.gider-goster-text").css("color", "#A3A5A8");
        $("p.gelir-goster-text").css("color", "#74b9ff");
    });

    $(".gider-goster-button").click(function () {

        $(".gelirler-panel").fadeOut(500).css("display", "none");
        $(".giderler-panel").fadeIn(500).css("display", "flex !important");
        $("p.gelir-goster-text").css("color", "#A3A5A8");
        $("p.gider-goster-text").css("color", "#74b9ff");
    });


    //Gelir Ekleme Formu Açma

    $(".gelir-ekle-button").click(function () {
        $(".gelir-form-arkaplan").css("display", "flex");

        //Burada Hesap İsimleri Selectbox içine Eklenecek.
        HesapIsimleriniGetir();
    });


    //Formu Kapatma
    $("#gelir-ekleme-kapat-icon").click(function () {
        $(".gelir-form-arkaplan").fadeOut(500);
    });



    //Gelir Ekleme Onay Button
    $(".gelir-ekleme-button").click(function () {

        //$(".gelir-form-arkaplan").fadeOut(500);
        GelirEkle();
        //Gelir Adını Al
        var gelirAdi = $("#gelir-adi").val();
        //Gelir Miktarını Al
        var gelirMiktar = $("#gelir-miktar").val();
        //alert("Gelir Miktar => " + gelirMiktar);
        //Seçili Hesap Adını Al
        var secilenHesap = $(".gelir-ekle-hesap-secimi :selected").val();

        //Burada Hemen Veri Tabanına Ekle
        $.ajax({
            type: "GET",
            url: "backend/hesaplarigetir.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var hesaplar = JSON.parse(response);


                $(hesaplar).each(function (index, item) {
                    //alert("Test #1 : " + item["hesapadi"]);
                    if (item["hesapadi"] == secilenHesap) {
                        //alert("Test #2 : " + item["hesapadi"]);
                        var secilenHesapID = item["id"];
                        var bakiye = item["bakiye"];
                        //temizle
                        bakiye = SemboluSil(bakiye);
                        //int yap
                        bakiye = parseFloat(bakiye);

                        gelirMiktar = SemboluSil(gelirMiktar);
                        gelirMiktar = parseFloat(gelirMiktar);
                        if (item["parabirimi"] == "Dolar") {
                            $.ajax({
                                type: "GET",
                                url: "backend/dovizsonucgetir.php",
                                success: function (response) {

                                    var s = JSON.parse(response);
                                    console.log("Döviz Sonucu(json) : " + s);
                                    //alert(s.dolar[0]);
                                    gelirMiktar = gelirMiktar / parseFloat(s.dolar[0]);
                                    gelirMiktar = gelirMiktar.toFixed(2)
                                    //işlemi yap
                                    bakiye = parseFloat(bakiye);
                                    bakiye = parseFloat(bakiye) + parseFloat(gelirMiktar)
                                    console.log("Son Bakiye : " + bakiye + "Tip : " + typeof (bakiye))
                                    //₺ ekleyerek string yap
                                    bakiye = bakiye.toFixed(2);
                                    bakiye = "$" + bakiye;
                                    //Post Et
                                    $.ajax({
                                        type: "POST",
                                        url: "backend/paratransfer.php",
                                        data: { id: secilenHesapID, yenibakiye: bakiye },
                                        dataType: "JSON",
                                        success: function (cevap) {
                                            console.log(cevap);
                                            //alert(cevap);
                                            //HareketEkle("Harcama", bakiye);
                                        },
                                        error: function (err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            })
                        }



                        if (item["parabirimi"] == "Euro") {
                            $.ajax({
                                type: "GET",
                                url: "backend/dovizsonucgetir.php",
                                success: function (response) {

                                    var s = JSON.parse(response);
                                    console.log("Döviz Sonucu(json) : " + s);
                                    //alert(s.dolar[0]);
                                    gelirMiktar = gelirMiktar / parseFloat(s.euro[0]);
                                    gelirMiktar = gelirMiktar.toFixed(2)
                                    //işlemi yap
                                    bakiye = parseFloat(bakiye);
                                    bakiye = parseFloat(bakiye) + parseFloat(gelirMiktar)
                                    console.log("Son Bakiye : " + bakiye + "Tip : " + typeof (bakiye))
                                    //₺ ekleyerek string yap
                                    bakiye = bakiye.toFixed(2);
                                    bakiye = "€" + bakiye;
                                    //Post Et
                                    $.ajax({
                                        type: "POST",
                                        url: "backend/paratransfer.php",
                                        data: { id: secilenHesapID, yenibakiye: bakiye },
                                        dataType: "JSON",
                                        success: function (cevap) {
                                            console.log(cevap);

                                            //HareketEkle("Harcama", bakiye);
                                            //alert(cevap);
                                        },
                                        error: function (err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            })
                        }

                        if (item["parabirimi"] == "Sterlin") {
                            $.ajax({
                                type: "GET",
                                url: "backend/dovizsonucgetir.php",
                                success: function (response) {

                                    var s = JSON.parse(response);
                                    console.log("Döviz Sonucu(json) : " + s.sterlin[0]);
                                    //alert(s.dolar[0]);
                                    gelirMiktar = gelirMiktar / parseFloat(s.sterlin[0]);
                                    gelirMiktar = gelirMiktar.toFixed(2)
                                    if (bakiye > gelirMiktar) {
                                        bakiye = parseFloat(bakiye);
                                        bakiye = parseFloat(bakiye) + parseFloat(gelirMiktar)
                                        console.log("Son Bakiye : " + bakiye + "Tip : " + typeof (bakiye))
                                        //₺ ekleyerek string yap
                                        bakiye = bakiye.toFixed(2);
                                        bakiye = "$" + bakiye;
                                        //Post Et
                                        $.ajax({
                                            type: "POST",
                                            url: "backend/paratransfer.php",
                                            data: { id: secilenHesapID, yenibakiye: bakiye },
                                            dataType: "JSON",
                                            success: function (cevap) {
                                                console.log(cevap);
                                                //alert(cevap);
                                                //HareketEkle("Harcama", bakiye);
                                            },
                                            error: function (err) {
                                                console.log(err);
                                            }
                                        });
                                    }
                                }
                            })
                        }

                        if (item["parabirimi"] == "Türk Lirası") {
                            $.ajax({
                                type: "GET",
                                url: "backend/dovizsonucgetir.php",
                                success: function (response) {

                                    var s = JSON.parse(response);
                                    console.log("Döviz Sonucu(json) : " + s);
                                    //alert(s.dolar[0]);
                                    //gelirMiktar = gelirMiktar / parseFloat(s.dolar[0]);

                                    if (bakiye > gelirMiktar) {
                                        //işlemi yap
                                        bakiye = bakiye + gelirMiktar
                                        console.log("Son Bakiye : " + bakiye + "Tip : " + typeof (bakiye))
                                        //₺ ekleyerek string yap
                                        bakiye = "₺" + bakiye;
                                        //Post Et
                                        $.ajax({
                                            type: "POST",
                                            url: "backend/paratransfer.php",
                                            data: { id: secilenHesapID, yenibakiye: bakiye },
                                            dataType: "JSON",
                                            success: function (cevap) {
                                                console.log(cevap);
                                                //HareketEkle("Harcama", bakiye);
                                                //alert(cevap);
                                            },
                                            error: function (err) {
                                                console.log(err);
                                            }
                                        });
                                    }
                                }
                            })
                        }

                    }
                });
            }
        })

        $(".gelir-form-arkaplan").fadeOut(500);
    });



    function GelirEkle() {
        //Gelir Adını Al
        var gelirAdi = $("#gelir-adi").val();
        //Gelir Miktarını Al
        var gelirMiktar = $("#gelir-miktar").val();
        //alert("Gelir Miktar => " + gelirMiktar);
        //Seçili Hesap Adını Al
        var secilenHesap = $(".gelir-ekle-hesap-secimi :selected").val();
        $.ajax({
            type: "POST",
            url: "backend/gelirekle.php",
            data: { geliradi: gelirAdi, gelirmiktar: gelirMiktar, gelirhesap: secilenHesap },
            dataType: "JSON",
            success: function (cevap) {
                console.log(cevap);
                //$(".transfer-form-arkaplan").fadeOut(500);
                //alert(cevap);

                //Para Transferi Hareketi Ekle
                // HareketEkle("Transfer", hareketMiktar);
                GelirleriGetir();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }


    var gelirToplami = 0.0;
    var gelirlerDizi = [];
    var haftalikGelirlerDizi = [];
    //Gelirleri Getir Ve Tabloya Ekle
    function GelirleriGetir() {

        $.ajax({
            type: "GET",
            url: "backend/gelirlerigetir.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var gelirler = JSON.parse(response);
                $("#gelir-liste-buhafta").remove();
                $("#gelir-liste-bugun").remove();
                gelirToplami = parseFloat(gelirToplami);
                $(gelirler).each(function (index, item) {
                    //alert(item["geliradi"]);

                    var gelirListeItem = '<div class="gelir-item" id="gelir-liste-bugun">' +
                        '<div class="gelir-item-icon-container">' +
                        '<i class="las la-money-bill" id="gelir-ikon"></i>' +
                        '</div>' +
                        '<div class="gelir-item-text-container">' +
                        '<p class="gelir-adi">' + item["geliradi"] + '</p>' +
                        '<p class="gelir-miktar" >' + item["gelirmiktar"] + '</p >' +
                        '<p class="gelir-hesap">' + item["gelirhesap"] + '</p>' +
                        '</div>'
                    '</div>';

                    $(".gelir-liste").append(gelirListeItem);
                    gelirlerDizi.push(item["gelirmiktar"]);

                });
                BugGunlukGeliriYazdir();


                //Haftalık Gelir
                $.ajax({
                    type: "GET",
                    url: "backend/gelirlerigetirhafta.php",
                    success: function (response) {
                        var hesapParaBirimi;
                        console.log("Hesaplar" + JSON.parse(response));

                        var gelirler = JSON.parse(response);


                        gelirToplami = parseFloat(gelirToplami);
                        $(gelirler).each(function (index, item) {
                            //alert(item["geliradi"]);

                            var gelirListeItem = '<div class="gelir-item" id="gelir-liste-buhafta">' +
                                '<div class="gelir-item-icon-container">' +
                                '<i class="las la-money-bill" id="gelir-ikon"></i>' +
                                '</div>' +
                                '<div class="gelir-item-text-container">' +
                                '<p class="gelir-adi">' + item["geliradi"] + '</p>' +
                                '<p class="gelir-miktar" >' + item["gelirmiktar"] + '</p >' +
                                '<p class="gelir-hesap">' + item["gelirhesap"] + '</p>' +
                                '</div>'
                            '</div>';

                            $(".gelir-liste-hafta").append(gelirListeItem);
                            //gelirlerDizi.push(item["gelirmiktar"]);
                            haftalikGelirlerDizi.push(item["gelirmiktar"]);
                            //alert("Basıldı");
                        });
                        HaftalikGeliriYazdir();


                    }
                })

            }
        })






    }

    var HaftalikGiderDizi = [];
    function GiderleriGetir() {
        $.ajax({
            type: "GET",
            url: "backend/hareketlertariharaligihafta.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var giderler = JSON.parse(response);


                gelirToplami = parseFloat(gelirToplami);
                $(giderler).each(function (index, item) {
                    //alert(item["geliradi"]);

                    var giderListeItem = '<div class="gelir-item" id="gelir-liste-buhafta">' +
                        '<div class="gelir-item-icon-container">' +
                        IkonuBul(item["kategori"], item["islem"]) +
                        '</div>' +
                        '<div class="gelir-item-text-container">' +
                        '<p class="gelir-adi">' + item["islem"] + '</p>' +
                        '<p class="gelir-miktar" >' + item["miktar"] + '</p >' +
                        '<p class="gelir-hesap">' + item["kategori"] + '</p>' +
                        '</div>'
                    '</div>';

                    $(".gider-liste-hafta").append(giderListeItem);
                    //gelirlerDizi.push(item["gelirmiktar"]);
                    console.log("GİDER ITEM =================>  " + item["miktar"])
                    HaftalikGiderDizi.push(item["miktar"]);
                    //alert("Basıldı");
                });
                //HaftalikGeliriYazdir();




                $.ajax({
                    type: "GET",
                    url: "backend/hareketlertariharaligibugun.php",
                    success: function (response) {
                        var hesapParaBirimi;
                        console.log("Hesaplar" + JSON.parse(response));

                        var giderler = JSON.parse(response);


                        gelirToplami = parseFloat(gelirToplami);
                        $(giderler).each(function (index, item) {
                            //alert(item["geliradi"]);

                            var giderListeItem = '<div class="gelir-item" id="gelir-liste-buhafta">' +
                                '<div class="gelir-item-icon-container">' +
                                IkonuBul(item["kategori"], item["islem"]) +
                                '</div>' +
                                '<div class="gelir-item-text-container">' +
                                '<p class="gelir-adi">' + item["islem"] + '</p>' +
                                '<p class="gelir-miktar" >' + item["miktar"] + '</p >' +
                                '<p class="gelir-hesap">' + item["kategori"] + '</p>' +
                                '</div>'
                            '</div>';

                            $(".gider-liste-bugun").append(giderListeItem);
                            //gelirlerDizi.push(item["gelirmiktar"]);
                            console.log("GİDER ITEM =================>  " + item["miktar"])
                            HaftalikGiderDizi.push(item["miktar"]);
                            //alert("Basıldı");
                        });
                        //HaftalikGeliriYazdir();


                    }
                })

            }
        })




    }


    function BugGunlukGeliriYazdir() {
        var toplam = 0.0;
        $(gelirlerDizi).each(function (index, item) {
            var temizlenmisGelir = SemboluSil(item);
            gelirToplami = parseFloat(gelirToplami);
            temizlenmisGelir = parseFloat(temizlenmisGelir);
            gelirToplami = gelirToplami + temizlenmisGelir;
            toplam += temizlenmisGelir;
            console.log("GELİRLER DİZİ #2 =================>  " + SemboluSil(item));
            console.log("GELİRLER DİZİ #2 =================>  " + typeof (parseFloat(SemboluSil(item))));
            console.log("GELİRLER TOPLAMI =========> " + toplam);
        });
        toplam = "₺" + toplam.toString();
        $(".bugun-gelir-miktar").text(toplam);
    }

    function HaftalikGeliriYazdir() {
        var toplam = 0.0;
        $(haftalikGelirlerDizi).each(function (index, item) {
            var temizlenmisGelir = SemboluSil(item);
            gelirToplami = parseFloat(gelirToplami);
            temizlenmisGelir = parseFloat(temizlenmisGelir);
            gelirToplami = gelirToplami + temizlenmisGelir;
            toplam += temizlenmisGelir;
            console.log("GELİRLER DİZİ #2 =================>  " + SemboluSil(item));
            console.log("GELİRLER DİZİ #2 =================>  " + typeof (parseFloat(SemboluSil(item))));
            console.log("GELİRLER TOPLAMI =========> " + toplam);
        });
        toplam = "₺" + toplam.toString();
        $(".buhafta-gelir-miktar").text(toplam);
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

                //$(".transfer-edilecek-hesap").remove();

                $(hesaplar).each(function (index, item) {
                    //console.log(item["hesapadi"]);


                    var n = item["bakiye"];
                    console.log("Bakiye : " + n);
                    console.log("Para Sembolu Silinmiş Miktar : " + SemboluSil(item["bakiye"]));


                });

                $(".transfer-edilecek-hesap").remove();
                $(hesaplar).each(function (index, item) {
                    //console.log(item["hesapadi"]);

                    var optionBilgi = item["hesapadi"] + "[" + item["tur"] + "]";
                    var eklenecekOption = '<option class="transfer-edilecek-hesap" value="' + item["hesapadi"] + '">' + optionBilgi + '</option>';

                    $(".gelir-ekle-hesap-secimi").append(eklenecekOption);

                    // if (item["id"] != transferID) {
                    //     if (item["parabirimi"] == hesapParaBirimi) {

                    //     }
                    // }

                });
            }
        })
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





    var secilenParaBirimi = null;
    var secilenParaBirimiSembolu = null;
    var ParaBirimleriVeSemboller = '{"TürkLirası" : "₺", "Dolar":"$","Euro":"€","Sterlin":"£"}';
    //Bununla Para Miktarı İnputuna Değer Girilmeye Başlayınca Yazının Başına Paranın Sembolünü Ekliyorum.
    ParaBirimleriVeSemboller = JSON.parse(ParaBirimleriVeSemboller);
    console.log(ParaBirimleriVeSemboller);

    $("#gelir-miktar").keypress(function () {
        var miktar = $("#gelir-miktar").val();
        if (secilenParaBirimiSembolu == null) {
            secilenParaBirimiSembolu = ParaBirimleriVeSemboller.TürkLirası;
        }

        if (miktar.indexOf(secilenParaBirimiSembolu) == -1) {

            var yeniMiktar = secilenParaBirimiSembolu + miktar;
            $("#gelir-miktar").val(yeniMiktar);

            var paraSemboller = ["$", "€", "₺", "£"];
            $(paraSemboller).each(function (index, item) {
                var sonuc = miktar.indexOf(item);
                if (sonuc > -1) {
                    //O kelimenin indexini bulup onun yerine koyulmalı

                    var removeItem = miktar[sonuc];
                    miktar = miktar.replace(removeItem, secilenParaBirimiSembolu);

                    $("#gelir-miktar").val(miktar);
                }
            })

        } else {
            console.log(miktar.indexOf(secilenParaBirimiSembolu));
        }
    });



    //Seçilen Para Birimini Bulma
    $(document).on("change", ".para-birimi", function () {
        var p = $(this).val();
        secilenParaBirimi = p;
        SemboluBul();
        var m = $("#miktar").val();
        SemboluGuncelle(m, secilenParaBirimiSembolu);

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

                $("#miktar").val(m);


            }
        })

    }


    //Harcama Kategorisine Göre İkonu Getirir.
    function IkonuBul(kategori, alan) {
        if (alan == "Harcama") {
            if (kategori == "market") {
                return '<i class="las la-shopping-basket" id="market-icon" data-ikon-etiket="harcama"></i>';
            }

            if (kategori == "saglik") {
                return '<i class="las la-leaf" id="saglik-icon" data-ikon-etiket="harcama"></i>';
            }

            if (kategori == "ulasim") {
                return '<i class="las la-bus" id="ulasim-icon" data-ikon-etiket="harcama"></i>';
            }

            if (kategori == "yemek") {
                return '<i class="las la-utensils" id="yemek-icon" data-ikon-etiket="harcama"></i>';
            }
            if (kategori == "sinema") {
                return '<i class="las la-film" id="sinema-icon" data-ikon-etiket="harcama"></i>';
            }

            if (kategori == "egitim") {
                return '<i class="las la-book" id="egitim-icon" data-ikon-etiket="harcama"></i>';
            }
        }

        if (alan == "Transfer") {
            //Buradakileri Yap.
            return '<i class="las la-exchange-alt" id="saglik-icon"></i>';
        }
    }




});