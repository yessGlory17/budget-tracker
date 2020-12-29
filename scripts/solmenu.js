$(document).ready(function () {

  //Bu değişken karşılaştırma için tıklanan nesneyi tutacak.
  var clickLeftButton = null;

  //Hesaplar divine tıklanınca çalışacak fonksiyon
  $("#hesaplar").on("click", function () {
    //alert();
    clickLeftButton = $(this);
    //RemoveItems("hesaplar");
    ActiveButtonControl();
    $("#hesaplar").delay(3000).css("border-left", "5px solid #21BF73");
    $("#hesaplar-icon").css("color", "#21BF73");
    $(".ana > *").css("display", "none");
    $(".hesaplar-container").css("display", "flex");

  });

  $("#genel-bakis").on("click", function () {
    //alert();
    clickLeftButton = $(this);
    ActiveButtonControl();
    $("#genel-bakis").delay(3000).css("border-left", "5px solid #21BF73");
    $("#genel-bakis-icon").css("color", "#21BF73");
    // $(".ana > *").css("display", "none");
    // $(".hesaplar-container").css("display", "flex");

    //console.log(clickLeftButton);
  });

  $("#kategoriler").on("click", function () {
    //alert();
    clickLeftButton = $(this);
    //RemoveItems("kategoriler");
    ActiveButtonControl();
    $("#kategoriler").delay(3000).css("border-left", "5px solid #21BF73");
    $("#kategoriler-icon").css("color", "#21BF73");
    $(".ana > *").css("display", "none");
    $(".kategoriler-container").css("display", "flex");

    //console.log(clickLeftButton);
  });


  $("#hareketler").on("click", function () {
    //alert();
    clickLeftButton = $(this);
    ActiveButtonControl();
    $("#hareketler").delay(3000).css("border-left", "5px solid #21BF73");
    $("#hareketler-icon").css("color", "#21BF73");
    $(".ana > *").css("display", "none");
    $(".hareketler-container").css("display", "flex");

    //console.log(clickLeftButton);
  });



  //Bu fonksiyon menude kullanılacak buttonların aktifliğini kontrol ederek ona göre css uygular.
  function ActiveButtonControl() {
    //alert(RemoveItems(clickLeftButton));
    console.log("Tıklanan Buton : " + $(clickLeftButton).innerHtml);

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



});