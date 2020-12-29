$(document).ready(function () {
    var tarihler = [];
    var kopya = [];
    //Default seçime göre hepsini gruplu getir.
    $.ajax({
        type: "GET",
        url: "backend/harcamalarigetir.php",
        success: function (response) {
            console.log("Hesaplar" + JSON.parse(response));
            var sonuc = JSON.parse(response);
            kopya = sonuc;
            console.log("Tarih Sonuc : " + response);
            TarihleriAyir(sonuc);
            $(sonuc).each(function (index, item) {

                console.log("Tarih İtem (Harcamalar) : " + item["islem"]);

                $(item).each(function (index, item2) {
                    //tarihler.push(item2["tarih"]);
                    console.log("###################=============> " + item2["islem"])
                    // var HareketItem = '<div class="hareket-item">' +
                    //     '<div class="hareket-item-icon">' +
                    //     IkonuBul(item2["kategori"]) +
                    //     '</div >' +
                    //     '<p class="text">' + item2["islem"] + '</p>' +
                    //     '<p class="hareket-miktar">' + item2["miktar"] + '</p>' +
                    //     '<p class="hareket-miktar">' + item2["tarih"] + '</p>' +
                    //     '</div >';


                    //$(".hareketler-container").append(HareketItem);
                });


            });

        }
    })
    //-Gelen Kategoriye Göre İkon bastır.
    //Seçim olduğunda seçime göre getir.


    //Harcama Kategorisine Göre İkonu Getirir.
    function IkonuBul(kategori, alan) {
        if (alan == "Harcama") {
            if ("market") {
                return '<i class="las la-shopping-basket" id="market-icon"></i>';
            } else {
                return '<i class="las la-film" id="sinema-icon"></i>';
            }
        }

        if (alan == "Transfer") {
            //Buradakileri Yap.
        }
    }

    //Tarihe Göre Kategorile.
    function TarihleriAyir(tarih) {
        //Tarihler içerisinde aynı olan tarihler aynı array içerisinde, farklı olanlar farklı arraylar içinde toplanacak.
        var t = []
        if (tarih.length > 0) {
            console.log("Tarihleri Ayırma Başlatıldı.");
            $(tarih).each(function (index, item) {
                t = []
                $(tarih).each(function (index, item2) {
                    if (item["tarih"] == item2["tarih"]) {

                        t.push(item2); //Burada Tarih değil, nesneler olacak.
                        tarih = RemoveItem(tarih, item2);
                    }
                });
                if (t.length > 0) {
                    tarihler.push(t);
                }
            });

            console.log("TARİHLER DİZİ ==========> " + tarihler);
            //TarihleriAyir(tarihler); //=> Rescursive Fonksiyon olmasından vazgeçtim. Mümkünse hiç bunu çalıştırmayın.
        }

        //Eğer kod buraya kadar geldiyse ayıklama işlemi tamamlandı demektir. Artık Harcama İtemlerini Tarihe Göre Bastırabilirim!
        if (tarih.length == 0) {
            console.log("Tarihler Ayıklanmasını Tamamladı!");
            $(tarihler).each(function (index, i) {
                console.log(" AYIKLANMIŞ TARİH ==============>         " + i[0]["tarih"]);
                //Burada Tarih Başlığı Eklenecek.
                var tarihBaslik = '<div class="tarih" id="' + i[0]["tarih"] + '">' + '<p class="hareket-tarih">' + i[0]["tarih"] + '</p>' + '</div>';
                $(".hareketler-container").append(tarihBaslik);
                $(i).each(function (index, item3) {
                    console.log(" AYIKLANMIŞ TARİH #2 ==============>         " + item3["tarih"]);
                    //Burada İtem Eklenecek.
                    var tarihIdContainer = '#' + item3["tarih"];
                    var HareketItem = '<div class="hareket-item">' +
                        '<div class="hareket-item-icon">' +
                        IkonuBul(item3["kategori"]) +
                        '</div >' +
                        '<p class="text">' + item3["islem"] + '</p>' +
                        '<p class="hareket-miktar">' + item3["miktar"] + '</p>' +
                        '<p class="hareket-miktar">' + item3["kategori"] + '</p>' +
                        '</div >';
                    $(tarihIdContainer).append(HareketItem);
                })
            });
            return;
        }







    }


    function RemoveItem(i, item) {
        i = jQuery.grep(i, function (value) {
            return value != item;
        });

        return i;
    }
});