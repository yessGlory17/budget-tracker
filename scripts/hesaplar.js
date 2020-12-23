$(document).ready(function () {

  //Bu değişken karşılaştırma için tıklanan nesneyi tutacak.
  var clickLeftButton = null;


  HesaplariGetir();



  //Hesaplar divine tıklanınca çalışacak fonksiyon
  $("#hesaplar").on("click", function () {
    //alert();
    ActiveButtonControl();
    $("#hesaplar").delay(3000).css("border-left", "5px solid #21BF73");
    $("#hesaplar-icon").css("color", "#21BF73");
    clickLeftButton = $(this);

  });

  $("#genel-bakis").on("click", function () {
    //alert();
    ActiveButtonControl();
    $("#genel-bakis").delay(3000).css("border-left", "5px solid #21BF73");
    $("#genel-bakis-icon").css("color", "#21BF73");
    clickLeftButton = $(this);
    //console.log(clickLeftButton);
  });

  $("#kategoriler").on("click", function () {
    //alert();

    ActiveButtonControl();
    $("#kategoriler").delay(3000).css("border-left", "5px solid #21BF73");
    $("#kategoriler-icon").css("color", "#21BF73");
    clickLeftButton = $(this);
    //console.log(clickLeftButton);
  });


  //Bu fonksiyon menude kullanılacak buttonların aktifliğini kontrol ederek ona göre css uygular.
  function ActiveButtonControl() {

    //Bu değişken sol menu buttonlarını karşılaştırma için tutar.
    var leftButtons = $(".sol-menu-button");
    $(".sol-menu-button").each(function (index, item) {
      //Eğer item tıklanan nesne değilse borderını kaldır ve rengini aktif olmayan rengine geçir.
      if (item != clickLeftButton) {
        $(item).css("border-left", "none");
        $(item).children().css("color", "#A3A5A8");

      }
    });

  }

  $("#hesap-ekleme-kapat-icon").click(function () {
    $(".hesap-ekle-form-arkaplan").fadeOut(1000);
  });

  $(".hesap-ekle").hover(function () {
    $(".hesap-ekle-text").fadeIn();
  }, function () {
    $(".hesap-ekle-text").fadeOut();
  });


  $(".hesap-ekle").click(function () {


    $(".hesap-ekle-form-arkaplan").fadeIn(1000).css("display", "flex");

    //$(".hesaplar-container").animate({left: '100px'});
  });

  //Hesap Ekleme Formu Ekleme Butonu
  $(".hesap-ekleme-onay-button").on("click", function () {
    HesapEkle();
  });


  //Bu fonksiyon veri tabanına hesap ekler.
  function HesapEkle() {

    //Hesap adi İnput
    var hesapAdi = $("#hesap-adi").val();
    //Miktar input
    var miktar = $("#miktar").val();
    //Para Birimi İnput
    var paraBirimi = $(".para-birimi option:selected").text();
    //Hesap Turu
    var hesapTuru = $('input[name="hesap-turu"]:checked', "#hesap-turu-form").val();
    $.ajax({
      type: "POST",
      url: "backend/hesapekle.php",
      data: { hesapadi: hesapAdi, miktar: miktar, parabirimi: paraBirimi, hesapturu: hesapTuru },
      dataType: "JSON",
      success: function (cevap) {
        console.log(cevap);

        //alert(cevap);
      },
      error: function (err) {
        console.log(err);
      }
    });


    $(".hesap-ekle-form-arkaplan").fadeOut(1000);
    HesaplariGetir();
  }


  /*Hesap Ekleme Form*/
  var secilenParaBirimi = null;
  var secilenParaBirimiSembolu = null;
  var ParaBirimleriVeSemboller = '{"TürkLirası" : "₺", "Dolar":"$","Euro":"€","Sterlin":"£"}';
  //Bununla Para Miktarı İnputuna Değer Girilmeye Başlayınca Yazının Başına Paranın Sembolünü Ekliyorum.
  ParaBirimleriVeSemboller = JSON.parse(ParaBirimleriVeSemboller);

  $("#miktar").keypress(function () {
    var miktar = $("#miktar").val();
    if (secilenParaBirimiSembolu == null) {
      secilenParaBirimiSembolu = ParaBirimleriVeSemboller.Dolar;
    }

    if (miktar.indexOf(secilenParaBirimiSembolu) == -1) {

      var yeniMiktar = secilenParaBirimiSembolu + miktar;
      $("#miktar").val(yeniMiktar);

      var paraSemboller = ["$", "€", "₺", "£"];
      $(paraSemboller).each(function (index, item) {
        var sonuc = miktar.indexOf(item);
        if (sonuc > -1) {
          //O kelimenin indexini bulup onun yerine koyulmalı

          var removeItem = miktar[sonuc];



          miktar = miktar.replace(removeItem, secilenParaBirimiSembolu);

          $("#miktar").val(miktar);
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
    //alert(p);
  });




  function SemboluBul() {
    if (secilenParaBirimi == "Türk Lirası") {
      //alert(ParaBirimleriVeSemboller.TürkLirası);
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
        //alert(miktar[sonuc]);
        var removeItem = m[sonuc];

        /*miktar = jQuery.grep(miktar, function(value) {
              return value != removeItem;
        });*/

        m = m.replace(removeItem, s);

        $("#miktar").val(m);


      }
    })

  }










  /*Hesap Ekleme POPUP*/

  var HesapEklePopUp = '<div class="form-arkaplan">' +
    '<div class="hesap-ekle-form">' +
    '<p class="form-baslik"> HESAP EKLE </p>' +
    '<input type="text" class="hesap-adi" placeholder="Hesap Adı">' +
    '<span class="para-input"> <input type="text" id="miktar" class="hesap-adi" placeholder="Miktar" ></span>' +

    '<select name="para-birimi" class="para-birimi">' +
    '<option>Dolar</option>' +
    '<option>Türk Lirası</option>' +
    '<option>Euro</option>' +
    '</select>' +
    '<div class="radio-buttons">' +
    '<label class="container">Nakit ' +
    '<input type="radio"  name="radio">' +
    '<span class="checkmark"></span>' +
    '</label>' +

    '<label class="container">Kart' +
    '<input type="radio"  name="radio">' +
    '<span class="checkmark"></span>' +
    '</label>' +
    '</div>' +

    '<div class="hesap-ekleme-button">' +
    '<p class="text"> Ekle </p>' +
    '</div>' +
    '</div>' +
    '</div>';



  //Bu fonksiyon hesapları getirir.
  function HesaplariGetir() {
    $.ajax({
      type: "GET",
      url: "backend/hesaplarigetir.php",
      success: function (response) {





        console.log("Hesaplar" + JSON.parse(response));
        var sonuc = JSON.parse(response);



        $(sonuc).each(function (index, item) {

          console.log("S: " + item["hesapadi"]);
          //Hesap Liste İtemi
          var hesapItem = '<div class="hesap-item">' +
            HesapTuruIcon(item["tur"]) +
            '<div class="hesaplar-item-text-container">' +
            '<p class="hesap-item-text" style="float: right;">' + item["hesapadi"] + '</p>' +
            '<p class="hesap-item-miktar" style="float: right;">' + item["bakiye"] + '</p>' +
            '</div>' +
            '<i class="las la-share" id="para-transfer" style="float: right; font-size: 35px; padding-top: 5px; padding-left: 10px; color: #b38d50; cursor: pointer;"></i>' +
            '<i class="las la-edit" style="float: right; font-size: 35px; padding-top: 5px; padding-left: 10px; color: #6e82ba; cursor: pointer;"></i>' +
            '<i class="las la-trash" style="float: right; font-size: 35px; padding-top: 5px; padding-left: 10px; padding-right: 10px; color: #cc2d32; cursor: pointer;"></i>' +
            '</div>';



          $(".hesaplar-liste").append(hesapItem);
          //$(".hesap-item").listview("refresh");

        });

      }
    })
  }

  //Bu fonksiyon hesap türüne göre hesap ikonunu döndürür.
  function HesapTuruIcon(tur) {

    var kart = '<div class="item-card-icon-container" style="float: left;">' +
      '<i class="las la-credit-card" id="hesap-item-icon-wallet"></i>' +
      '</div>';

    var nakit = '<div class="item-wallet-icon-container" style="float: left;">' +
      '<i class="las la-wallet" id="hesap-item-icon-wallet"></i>' +
      '</div>';

    if (tur == "Nakit") {
      return nakit;
    }

    if (tur == "Kart") {
      return kart;
    }
  }

});