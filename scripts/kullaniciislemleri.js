$(document).ready(function () {

    KullaniciBilgileriniGetir();


    $(".sistem-loglari-log-goster").click(function () {
        $(".kullanici-islemleri-ana-container").fadeOut(500).css("display", "none");
        $(".kullanici-islemleri-container").fadeIn(500).css("width", "920px");
        $(".log-liste").fadeIn(500).css("display", "flex");
        $(this).fadeOut(500).css("display", "none");
        $(".sistem-loglari-log-gizle").fadeIn(500).css("display", " ");
        LoglariGetir();
    });

    $(".sistem-loglari-log-gizle").click(function () {
        $(".kullanici-islemleri-ana-container").fadeOut(500).css("display", "flex");
        $(".kullanici-islemleri-container").fadeIn(500).css("width", "400px");
        $(".log-liste").fadeIn(500).css("display", "none");
        $(this).fadeOut(500).css("display", "none");
        $(".sistem-loglari-log-goster").fadeIn(500).css("display", " ");
    });


    $(".kullanici-bilgileri-guncelle-button").click(function () {
        KullaniciDuzenle();
    });

    //Kullanıcı Bilgilerini Al Ve Formu Doldur
    function KullaniciBilgileriniGetir() {
        $.ajax({
            type: "GET",
            url: "backend/kullanicibilgilerinigetir.php",
            success: function (response) {
                console.log(JSON.parse(response));
                var sonuc = JSON.parse(response);

                $(sonuc).each(function (index, item) {
                    //alert(item["email"]);
                    $(".kullanici-islemleri-email").val(item["email"]);
                    $(".kullanici-islemleri-sifre").val(item["sifre"]);
                });
            }
        })
    }

    //Kullanıcı Bilgilerini Güncelle
    function KullaniciDuzenle() {
        var email = $(".kullanici-islemleri-email").val();
        var sifre = $(".kullanici-islemleri-sifre").val();
        $.ajax({
            type: "POST",
            url: "backend/kullaniciduzenle.php",
            data: { email: email, sifre: sifre },
            dataType: "JSON",
            success: function (cevap) {
                console.log(cevap);

            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //Sistem Loglarını Getir
    function LoglariGetir() {
        $.ajax({
            type: "GET",
            url: "backend/loglarigetir.php",
            success: function (response) {
                console.log(JSON.parse(response));
                var sonuc = JSON.parse(response);
                $(".log-item").remove();
                $(sonuc).each(function (index, item) {


                    var logListItem = '<div class="log-item">' +
                        '<i class="las la-user" id="log-kullanici-adi-icon"></i>' +
                        '<p class="log-kullanici-adi-text">' + item["kullaniciadi"] + '</p>' +
                        '<i class="las la-map-pin" id="log-kullanici-adi-icon"></i>' +
                        '<p class="log-kullanici-adi-text">' + item["ip"] + '</p>' +
                        '<i class="las la-sign-in-alt" id="log-kullanici-giris-zamani-icon"></i>' +
                        '<p class="log-kullanici-giris-zamani-text">' + item["giriszamani"] + '</p>' +
                        '<i class="las la-sign-out-alt" id="log-kullanici-cikis-zamani-icon"></i>' +
                        '<p class="log-kullanici-cikis-zamani-text">' + item["cikiszamani"] + '</p>' +
                        '</div>';

                    $(".log-liste").append(logListItem);


                });


            }
        })
    }


});