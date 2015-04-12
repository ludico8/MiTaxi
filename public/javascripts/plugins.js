// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
// Place any jQuery/helper plugins in here.

// Returns single object
$.fn.first = function() {
    var ele = jQuery(this).filter(':first')[0];
    if(ele !== undefined) {
        return ele;
    }
    return null;
};

// Activate single page mode
(function(){
  function initialize(){
    $('div[data-role=page]:first').show();
    $('a[href^="#"]').click(function(event){
      event.preventDefault();
      $('div[data-role=page]').hide();
      $('div[data-role=page]' + $(this).attr('href')).show();
      $('a[href^="#"]').removeClass('selected')
      $(this).addClass('selected')
      // var $panel = $('div[data-role=page]'+ $(this).attr('href')).first();
      // $panel.show();
      // $panel.animate({
      //   left: parseInt($panel.css('left'), 10) == 0 ? $panel.outerWidth() : 0
      // });
    });
  };
  initialize();
}());
