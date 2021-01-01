$(document).ready(function () {


    //Giris Yapma
    $(".login-button").click(function () {
        var email = $("#email").val();
        var sifre = $("#sifre").val();


        //alert(email + sifre);
        //Ajax Post İşlemi
        $.ajax({
            type: "POST",
            url: "backend/giris.php",
            data: { email: email, sifre: sifre },
            dataType: "JSON",
            success: function (cevap) {
                //var mesaj = JSON.parse(cevap);
                console.log(cevap);

                if (cevap) {
                    localStorage.setItem('auth-user', email);
                    window.location.href = "index.html";
                } else {
                    console.log("yakalandıııı");
                }

            },
            error: function (err) {
                var mesaj = JSON.parse(cevap);
                console.log(mesaj[0]);
            }
        });
    });



    //OTURUM KONTROLU
    function OturumKontrolu() {
        $.ajax({
            type: "GET",
            url: "backend/oturumkontrolu.php",
            success: function (response) {
                console.log(JSON.parse(response));
                var sonuc = JSON.parse(response);

                if (sonuc) {
                    $(".giris").css("display", "none");
                    window.location.href = "giris.html";
                } else {
                    $(".yonet").css("display", "none");
                    $(".cikis").css("display", "none");
                }

            }
        })
    }
});