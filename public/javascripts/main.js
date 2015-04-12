$(document).ready(function() { 
	console.log('welcome to my taxi');

  //Active route depend of the URL
  activeRoute();


  /*********************** SLIDESHOW SECTION  *********************************/
  /***********************                 *********************************/
  swiperSlideshow("slideshow-taxi");
  swiperSlideshow("slideshow-driver");
  swiperSlideshow("slideshow-central");	



  $("#mostrar").click(function(event) {
    event.preventDefault();
    $("#slideBox").slideToggle();
    //$("#contenedor").attr({'style': 'background-color:rgba(255,0,0,0.2); width:50%; height:150px; text-align: center; margin: 0% 25%; padding-top: 60px;'});
  });

/*********************** EXTRAS SECTION  *********************************/
/***********************                 *********************************/
  //Initialize counters buttons.
  $('#taxi_counter').spinit(    { height: 30, width: 60, min: 0, initValue: 1, max: 255  });
  $('#admin_counter').spinit(    { height: 30, width: 60, min: 0, initValue: 1, max: 255  });
  $('#mobil_counter').spinit(    { height: 30, width: 60, min: 0, initValue: 1, max: 255  });
  $('#tablets_counter').spinit(    { height: 30, width: 60, min: 0, initValue: 1, max: 255  });
  
  //Function to Show or hide extraCalculate section.
  $("#extraCalculate").click(function(event) {

    event.stopPropagation();
    event.preventDefault();
        
    if( $('#slideBox').is(':visible') ) {
      $("#extraCalculate").attr('value', 'COTIZAR EXTRAS');
    }
    else {
      $("#extraCalculate").attr('value', 'CERRAR');
    }
    $("#slideBox").slideToggle();

  });

  //Function change event of radio buttons.
  $('input[name="selection1"]').change(function () {
    var rad_opt_id = $('input[name="selection1"]:checked').val();
    var licence_text = $("#td_licen_"+rad_opt_id).html(); 
    var price_licence = $("#td_price_"+rad_opt_id).html(); 
    $("#td_ext_licence").html(licence_text);
    $("#td_licence_price").html(price_licence);
    getTotalPrice();
  });

  function getTotalPrice(){
    var totalExtra = parseInt($("#td_licence_price").html().replace('$','').replace(',°°','')) +  parseInt($("#taxi_counter_price").html().replace('$','').replace(',°°','')) +
                      parseInt($("#admin_counter_price").html().replace('$','').replace(',°°','')) + parseInt($("#mobil_counter_price").html().replace('$','').replace(',°°','')) +
                       parseInt($("#tablets_counter_price").html().replace('$','').replace(',°°','')) - parseInt($("#td_ext_discount_price").html().replace('$','').replace(',°°','')); 
    $("#td_ext_total_price").html("$"+ totalExtra +",°°");
  }

});


/*
  Function to active the central or driver route
*/
function activeRoute() {

  $("nav a").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    var type = ($(this).attr("href")).replace("#","");
    window.history.replaceState(null, type, "/" + type);
  });

  var pathName = window.location.pathname.replace("/","");
  console.log(pathName);

  if (pathName == "driver" || pathName == "central" || pathName == "index") {
    $("nav a.selected").removeClass("selected");
    $("nav a[href='#"+pathName+"']").addClass("selected");
    $("#index").hide();
    $("#"+pathName).show();
  }
}

/*
  Function to create slideshow swiper
*/
function swiperSlideshow(elementId) {
  $('#'+elementId).swiper({
    mode:'horizontal',
    loop: false
  });
}