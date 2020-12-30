$(document).ready(function () {
    function renderChart(data, labels, harcamalar) {

        var ctx = document.getElementById("doughnut-chart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#1C3A51", "#11D9B2", "#FDCB6E", "#7211D9", "#E84374", "#A22DE0"],
                        data: harcamalar,
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Toplam Harcama Grafiği'
                }
            }
        });
    }

    var data = [];
    var labels = [];
    var harcamalar = [];

    GrafikYukle();

    function GrafikYukle() {
        data = [];
        labels = [];
        harcamalar = [];
        $.ajax({
            type: "GET",
            url: "backend/kategoribilgileri.php",
            success: function (response) {
                var hesapParaBirimi;
                console.log("Hesaplar" + JSON.parse(response));

                var hesaplar = JSON.parse(response);

                //Alınan kategori bilgilerini işle

                $(hesaplar).each(function (index, item) {
                    if (!labels.includes(item.kategori_adi)) {
                        labels.push(item.kategori_adi);
                    }

                    if (!harcamalar.includes(item.harcama)) {
                        harcamalar.push(parseFloat(SemboluSil(item.harcama)));
                    }

                    data.push(item.id);
                    console.log("# Array : " + item.harcama);
                    console.log("##### " + item.kategori_adi);
                });

                renderChart(data, labels, harcamalar);
            }
        })
    }


    $(".harcama-button").on("click", function () {
        GrafikYukle();
    });


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
});