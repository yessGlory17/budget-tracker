$(document).ready(function () {

    $("#cikis").click(function () {

        setTimeout(
            function () {
                CikisYap();
            }, 1000);
    });

    function CikisYap() {

        $.ajax({
            type: "GET",
            url: "backend/cikis.php",
            success: function (response) {
                console.log(JSON.parse(response));
                var sonuc = JSON.parse(response);

                if (sonuc) {
                    window.location.href = "login.html";
                }
            }
        })

    }
});