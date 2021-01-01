$(document).ready(function () {


    OturumKontrolu();

    function OturumKontrolu() {
        $.ajax({
            type: "GET",
            url: "backend/oturumkontrolu.php",
            success: function (response) {
                console.log(JSON.parse(response));
                var sonuc = JSON.parse(response);

                if (!sonuc) {
                    //alert("Oturum Başarılı ! => " + sonuc);
                    window.location.href = "login.html";
                    // return;
                }

            }
        })
    }
});