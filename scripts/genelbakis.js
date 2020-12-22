$(document).ready(function () {

  //Bu değişken karşılaştırma için tıklanan nesneyi tutacak.
  var clickLeftButton = null;

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
        //console.log(leftButtons);
        //console.log("Find : " + item["id"] );
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
    HesapEkle();

    $(".hesap-ekle-form-arkaplan").fadeIn(1000).css("display", "flex");

    //$(".hesaplar-container").animate({left: '100px'});
  });

  function HesapEkle() {
    var kart = '<div class="hesap-item">' +
      '<i class="las la-trash" style="float: right; font-size: 35px; padding-top: 5px; padding-right: 10px; color: #cc2d32; cursor: pointer;"></i>' +
      '<i class="las la-edit" style="float: right; font-size: 35px; padding-top: 5px; color: #6e82ba; cursor: pointer;"></i>' +
      '<p class="hesap-item-text" style="float: right;"> Nakit </p>' +
      '<div class="item-wallet-icon-container" style="float: left;">' +
      '<i class="las la-wallet" id="hesap-item-icon-wallet" ></i>' +
      '</div>' +
      '</div>';

    $(".hesaplar-liste").append(kart);

  }


  /*Hesap Ekleme Form*/
  var secilenParaBirimi = null;
  var secilenParaBirimiSembolu = null;
  var ParaBirimleriVeSemboller = '{"TürkLirası" : "₺", "Dolar":"$","Euro":"€","Sterlin":"£"}';
  //Bununla Para Miktarı İnputuna Değer Girilmeye Başlayınca Yazının Başına Paranın Sembolünü Ekliyorum.
  ParaBirimleriVeSemboller = JSON.parse(ParaBirimleriVeSemboller);
  console.log(ParaBirimleriVeSemboller);

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
          //alert(miktar[sonuc]);
          var removeItem = miktar[sonuc];

          /*miktar = jQuery.grep(miktar, function(value) {
                return value != removeItem;
          });*/

          miktar = miktar.replace(removeItem, secilenParaBirimiSembolu);
          //alert(miktar);
          //miktar[0] = miktar.splice(sonuc,1,secilenParaBirimiSembolu);
          //alert(miktar[sonuc]);
          //miktar[sonuc] = secilenParaBirimiSembolu;
          $("#miktar").val(miktar);

          //alert("Bulundu:"  + item);
        }
      })
      //alert(secilenParaBirimiSembolu);
      //var yeniMiktar = secilenParaBirimiSembolu + miktar;
      //$("#miktar").val(yeniMiktar);
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

});