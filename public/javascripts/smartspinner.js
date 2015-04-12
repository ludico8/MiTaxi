(function($) {
    $.fn.extend({
        spinit: function(options) {
            var settings = $.extend({ min: 0, max: 100, initValue: 0, callback: null, stepInc: 1, pageInc: 10, width: 50, height: 15, btnWidth: 10, mask: '' }, options);
            return this.each(function() {
                var UP = 38;
                var DOWN = 40;
                var PAGEUP = 33;
                var PAGEDOWN = 34;
                var mouseCaptured = false;
                var mouseIn = false;
                var interval;
                var direction = 'none';
                var isPgeInc = false;
                var value = Math.max(settings.initValue, settings.min);
                var el = $(this).val(value).css('width', (settings.width) + 'px').css('height', settings.height + 'px').addClass('smartspinner');

                function setDirection(dir) {
                    direction = dir;
                    isPgeInc = false;
                    switch (dir) {
                        case 'up':
                            setClass('up');
                            break;
                        case 'down':
                            setClass('down');
                            break;
                        case 'pup':
                            isPgeInc = true;
                            setClass('up');
                            break;
                        case 'pdown':
                            isPgeInc = true;
                            setClass('down');
                            break;
                        case 'none':
                            setClass('');
                            break;
                    }
                }
                el.focusin(function() {
                    el.val(value);
                });
                el.click(function(e) {
                    mouseCaptured = true;
                    isPgeInc = false;
                    clearInterval(interval);
                    onValueChange();
                    var concept_idButton = el.attr('id');
                    var acount_concept = $("#"+concept_idButton).val();
                    var price_idButton = concept_idButton+"_price";
                    var price_value = $("#"+price_idButton).attr("name");
                    var totalConcept =  acount_concept * price_value;
                    $("#"+price_idButton).html("$"+ totalConcept +",°°");

                    var totalExtra = parseInt($("#td_licence_price").html().replace('$','').replace(',°°','')) +  parseInt($("#taxi_counter_price").html().replace('$','').replace(',°°','')) +
                                      parseInt($("#admin_counter_price").html().replace('$','').replace(',°°','')) + parseInt($("#mobil_counter_price").html().replace('$','').replace(',°°','')) +
                                       parseInt($("#tablets_counter_price").html().replace('$','').replace(',°°','')) - parseInt($("#td_ext_discount_price").html().replace('$','').replace(',°°','')); 
                    $("#td_ext_total_price").html("$"+ totalExtra +",°°");
                }); 

                el.mouseenter(function(e) {
                    el.val(value);
                });
                el.mousemove(function(e) {

                    if (e.pageX > (el.offset().left + settings.width) - settings.btnWidth - 4) {
                        if (e.pageY < el.offset().top + settings.height / 2)
                            setDirection('up');
                        else
                            setDirection('down');
                    }
                    else
                        setDirection('none');
                });
                el.mousedown(function(e) {
                    isPgeInc = false;
                    clearInterval(interval);
                    interval = setInterval(onValueChange, 100);
                });
                el.mouseup(function(e) {
                    mouseCaptured = false;
                    isPgeInc = false;
                    clearInterval(interval);

                });
                el.mouseleave(function(e) {
                    setDirection('none');
                    if (settings.mask != '') el.val(settings.mask);
                }); el.keydown(function(e) {
                    switch (e.which) {
                        case UP:
                            setDirection('up');
                            onValueChange();
                            break; // Arrow Up
                        case DOWN:
                            setDirection('down');
                            onValueChange();
                            break; // Arrow Down
                        case PAGEUP:
                            setDirection('pup');
                            onValueChange();
                            break; // Page Up
                        case PAGEDOWN:
                            setDirection('pdown');
                            onValueChange();
                            break; // Page Down
                        default:
                            setDirection('none');
                            break;
                    }
                });

                if (this.addEventListener) {
                    this.addEventListener('DOMMouseScroll', function(e) {
                        if (e.detail > 0) {
                            setDirection('down');
                            onValueChange();
                        }
                        else if (e.detail < 0) {
                            setDirection('up');
                            onValueChange();
                        }
                        e.preventDefault();
                    }, false);
                }

                function getSelectedText() {

                    var startPos = el.get(0).selectionStart;
                    var endPos = el.get(0).selectionEnd;
                    var doc = document.selection;

                    if (doc && doc.createRange().text.length != 0) {
                        return doc.createRange().text;
                    } else if (!doc && el.val().substring(startPos, endPos).length != 0) {
                        return el.val().substring(startPos, endPos);
                    }
                    return '';
                }
                function setValue(a, b) {
                    if (a >= settings.min && a <= settings.max) {
                        value = b;
                    } el.val(value);
                }
                function onValueChange() {
                    if (direction == 'up') {
                        value += settings.stepInc;
                        if (value > settings.max) value = settings.max;
                        setValue(parseFloat(el.val()), value);
                    }
                    if (direction == 'down') {
                        value -= settings.stepInc;
                        if (value < settings.min) value = settings.min;
                        setValue(parseFloat(el.val()), value);
                    }
                    if (direction == 'pup') {
                        value += settings.pageInc;
                        if (value > settings.max) value = settings.max;
                        setValue(parseFloat(el.val()), value);
                    }
                    if (direction == 'pdown') {
                        value -= settings.pageInc;
                        if (value < settings.min) value = settings.min;
                        setValue(parseFloat(el.val()), value);
                    }
                    //raiseCallback(value);
                }
                function setClass(name) {
                    el.removeClass('up').removeClass('down');
                    if (name != '') el.addClass(name);
                }
            });
        }
    });
})(jQuery);