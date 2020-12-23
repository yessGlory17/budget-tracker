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


  $("#hareketler").on("click", function () {
    //alert();

    ActiveButtonControl();
    $("#hareketler").delay(3000).css("border-left", "5px solid #21BF73");
    $("#hareketler-icon").css("color", "#21BF73");
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


});