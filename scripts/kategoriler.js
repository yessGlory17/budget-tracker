$(document).ready(function () {

    var toplamGider = [];
    KategoriBilgileriniYukle();

    //Harcama Ekleme Formu Kapatma
    $("#harcama-ekleme-kapat-icon").click(function () {
        $(".hesap-adi").val("");
        $(".harcama-form-arkaplan").fadeOut(500);
    });


    //Ekle butonuna basılınca post işlemi ile masraf eklenecek.
    $(".harcama-button").on("click", function () {
        var kategori = $(".harcama-button").attr("data-post-name");
        //alert(kategori);
        var harcamaMiktar = $("#harcama-miktar").val();
        var secilenHesap = $(".kategori-secimi option:selected").text();
        //alert(secilenHesap);
        $.ajax({
            type: "GET",
            url: "backend/kategoribilgileri.php",
            success: function (response) {

                console.log("Hesaplar" + JSON.parse(response));
                var sonuc = JSON.parse(response);
                var kategoriHarcama;
                $(sonuc).each(function (index, item) {
                    console.log(item["harcama"]);

                    if (item["kategori_adi"] == kategori) {
                        //console.log("Kategori Bulundu : " + item["kategori_adi"]);
                        kategoriHarcama = item["harcama"];

                        kategoriHarcama = SemboluSil(kategoriHarcama);
                        kategoriHarcama = parseInt(kategoriHarcama);

                        harcamaMiktar = SemboluSil(harcamaMiktar);
                        harcamaMiktar = parseInt(harcamaMiktar);

                        kategoriHarcama = kategoriHarcama + harcamaMiktar;

                        kategoriHarcama = "₺" + kategoriHarcama;


                        $.ajax({
                            type: "POST",
                            url: "backend/harcamaekle.php",
                            data: { kategori: kategori, harcama: kategoriHarcama },
                            dataType: "JSON",
                            success: function (cevap) {
                                console.log("Harcama Ekleme Başarılı ! " + cevap);
                                $(".hesap-adi").val("");
                                $(".harcama-form-arkaplan").fadeOut(500);
                                $(".etiket-harcama-text").text("₺0");
                                KategoriBilgileriniYukle();
                                //alert(cevap);
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        });

                    }
                });

            }
        })





    });

    // $.ajax({
    //     type: "GET",
    //     url: "backend/dovizsonucgetir.php",
    //     success: function (response) {
    //         console.log("Döviz Sonucu : " + response);
    //         console.log("D : " + response);
    //         var s = JSON.parse(response);
    //         console.log("Döviz Sonucu(json) : " + s);
    //         //alert(s.dolar[0]);
    //         $(s).each(function (index, item) {
    //             console.log("d - >  : " + item["dolar"]["0"]);
    //         });
    //     }
    // })

    $(".harcama-button").on("click", function () {
        //Hesaplar GET
        //alert("Test 0");
        var kategori = $(".harcama-button").attr("data-post-name");
        //alert(kategori);
        var harcamaMiktar = $("#harcama-miktar").val();
        var secilenHesap = $(".kategori-secimi option:selected").attr("value");
        //alert("Harcam Miktar Test : " + harcamaMiktar + "Type  :  " + typeof (harcamaMiktar));
        HareketEkle("Harcama", harcamaMiktar);

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
                        bakiye = parseInt(bakiye);

                        harcamaMiktar = SemboluSil(harcamaMiktar);
                        harcamaMiktar = parseInt(harcamaMiktar);
                        if (item["parabirimi"] == "Dolar") {
                            $.ajax({
                                type: "GET",
                                url: "backend/dovizsonucgetir.php",
                                success: function (response) {

                                    var s = JSON.parse(response);
                                    console.log("Döviz Sonucu(json) : " + s);
                                    //alert(s.dolar[0]);
                                    harcamaMiktar = harcamaMiktar / parseFloat(s.dolar[0]);
                                    harcamaMiktar = harcamaMiktar.toFixed(2)
                                    if (bakiye > harcamaMiktar) {
                                        //işlemi yap
                                        bakiye = bakiye - harcamaMiktar
                                        console.log("Son Bakiye : " + bakiye + "Tip : " + typeof (bakiye))
                                        //₺ ekleyerek string yap
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



                        if (item["parabirimi"] == "Euro") {
                            $.ajax({
                                type: "GET",
                                url: "backend/dovizsonucgetir.php",
                                success: function (response) {

                                    var s = JSON.parse(response);
                                    console.log("Döviz Sonucu(json) : " + s);
                                    //alert(s.dolar[0]);
                                    harcamaMiktar = harcamaMiktar / parseFloat(s.dolar[0]);
                                    harcamaMiktar = harcamaMiktar.toFixed(2)
                                    if (bakiye > harcamaMiktar) {
                                        //işlemi yap
                                        bakiye = bakiye - harcamaMiktar
                                        console.log("Son Bakiye : " + bakiye + "Tip : " + typeof (bakiye))
                                        //₺ ekleyerek string yap
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
                                }
                            })
                        }

                        if (item["parabirimi"] == "Sterlin") {
                            $.ajax({
                                type: "GET",
                                url: "backend/dovizsonucgetir.php",
                                success: function (response) {

                                    var s = JSON.parse(response);
                                    console.log("Döviz Sonucu(json) : " + s);
                                    //alert(s.dolar[0]);
                                    harcamaMiktar = harcamaMiktar / parseFloat(s.dolar[0]);
                                    harcamaMiktar = harcamaMiktar.toFixed(2)
                                    if (bakiye > harcamaMiktar) {
                                        //işlemi yap
                                        bakiye = bakiye - harcamaMiktar
                                        console.log("Son Bakiye : " + bakiye + "Tip : " + typeof (bakiye))
                                        //₺ ekleyerek string yap
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
                                    //harcamaMiktar = harcamaMiktar / parseFloat(s.dolar[0]);

                                    if (bakiye > harcamaMiktar) {
                                        //işlemi yap
                                        bakiye = bakiye - harcamaMiktar
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
    })
    //Veritabanının hazırlanması.


    //Burada kategoriye tıklanınca data-harcama-etiket attribute'unu kullanarak kategori adını alacağım.
    $(".etiket-icon").click(function () {
        //alert($(this).attr("data-harcama-etiket"));
        $("p.harcama-kategori-adi").text($(this).attr("data-harcama-etiket"));
        $(".harcama-form-arkaplan").fadeIn(500).css("display", "flex");
        var kategori = $(this).attr("data-post-name");
        $(".harcama-button").attr("data-post-name", kategori);
        HesapIsimleriniGetir();
    })


    function HesapIsimleriniGetir() {
        $.ajax({
            type: "GET",
            url: "backend/hesaplarigetir.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var hesaplar = JSON.parse(response);

                $(".transfer-edilecek-hesap").remove();

                hesapParaBirimi = "Türk Lirası";

                $(hesaplar).each(function (index, item) {
                    //console.log(item["hesapadi"]);

                    var optionBilgi = item["hesapadi"] + "[" + item["tur"] + "]";
                    var eklenecekOption = '<option class="transfer-edilecek-hesap" value="' + item["hesapadi"] + '">' + optionBilgi + '</option>';

                    $(".kategori-secimi").append(eklenecekOption);
                    if (item["parabirimi"] == hesapParaBirimi) {

                    }

                });
            }
        })
    }






    function KategoriBilgileriniYukle() {
        $.ajax({
            type: "GET",
            url: "backend/kategoribilgileri.php",
            success: function (response) {

                console.log("Kategoriler" + JSON.parse(response));
                var sonuc = JSON.parse(response);
                var kategoriHarcama;
                toplamGider = [];
                $(sonuc).each(function (index, item) {
                    console.log(item["harcama"]);
                    var currentItem = item;
                    var kategoriler = $(".etiket-icon");
                    toplamGider.push(parseInt(SemboluSil(currentItem["harcama"])));
                    $(kategoriler).each(function (index, item) {
                        var currentCategory = item;
                        //alert($(item).attr("data-post-name"));
                        if ($(currentCategory).attr("data-post-name") == currentItem["kategori_adi"]) {
                            //$(currentCategory).parent().last().text(currentItem["harcama"]);
                            $(currentCategory).parent().find("p.etiket-harcama-text").text(currentItem["harcama"]);

                        }
                    });
                });


                //Toplam Gideri Yazdır.
                var toplam = 0;
                $(toplamGider).each(function (index, item) {
                    toplam += toplamGider[index];
                });
                var toplamGiderText = "Toplam Gider : " + "₺" + toplam;
                $(".toplam-gider-text").text(toplamGiderText);
            }
        })
    }
























    var secilenParaBirimi = null;
    var secilenParaBirimiSembolu = null;
    var ParaBirimleriVeSemboller = '{"TürkLirası" : "₺", "Dolar":"$","Euro":"€","Sterlin":"£"}';
    //Bununla Para Miktarı İnputuna Değer Girilmeye Başlayınca Yazının Başına Paranın Sembolünü Ekliyorum.
    ParaBirimleriVeSemboller = JSON.parse(ParaBirimleriVeSemboller);
    console.log(ParaBirimleriVeSemboller);

    $("#harcama-miktar").keypress(function () {
        var miktar = $("#harcama-miktar").val();
        if (secilenParaBirimiSembolu == null) {
            secilenParaBirimiSembolu = ParaBirimleriVeSemboller.TürkLirası;
        }

        if (miktar.indexOf(secilenParaBirimiSembolu) == -1) {

            var yeniMiktar = secilenParaBirimiSembolu + miktar;
            $("#harcama-miktar").val(yeniMiktar);

            var paraSemboller = ["$", "€", "₺", "£"];
            $(paraSemboller).each(function (index, item) {
                var sonuc = miktar.indexOf(item);
                if (sonuc > -1) {
                    //O kelimenin indexini bulup onun yerine koyulmalı

                    var removeItem = miktar[sonuc];
                    miktar = miktar.replace(removeItem, secilenParaBirimiSembolu);

                    $("#harcama-miktar").val(miktar);
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

                $("#harcama-miktar").val(m);


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

    function HareketEkle(islemAdi, miktar) {
        $.ajax({
            type: "POST",
            url: "backend/hareketekle.php",
            data: { islem: islemAdi, miktar: miktar },
            dataType: "JSON",
            success: function (cevap) {
                console.log(cevap);
                console.log("Hareket Eklendi!");
                //alert(cevap);
            },
            error: function (err) {
                console.log(err);
                console.log("Hareket Ekleme Başarısız!");
            }
        });
    }
});