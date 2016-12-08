var $html = $('html');
var $body = $('body');
var clickNow = 0;
var xSpeed = 1;
var nowLevel = 1;
var flag = false;
var timetime = 15;

$(function(){
  countdown();
  $timer = setInterval(countdown,1000);
  function countdown(){
    timetime -=1;
    $('.time').text(timetime);
    if(timetime<=9){
      $('.time').css("left","35%");
    }
    if(timetime <= 0 && nowLevel !=5){
      clearInterval($timer);
      window.location.href = "game_lose.html";
    }
  }

  $html.on("tap",function(){
    var $bg1 = $(".bg1");
    var $bg2 = $(".bg2");
    var $bg3 = $(".bg3");
    var offset1 = $bg1.position();
    var offset2 = $bg2.position();
    var offset3 = $bg3.position();
    var clickAllGoal = 80;
    var clickOneGoal = 15;
    var clickTwoGoal = 30;
    var clickThreeGoal = 35;
    var clickFourGoal = 55;
    if(flag == false){
      flag = true;
      $('.runPos').css("display","block");
      $('.stopPos').css("display","none");
      if(nowLevel==1){
        $bg1.stop(true,true).animate({
          width : "-=6%",
          left : "+=3%",
          opacity : "-=0.07"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
      }
      if(nowLevel==2){
        $bg1.stop(true,true).animate({
          width : "-=6%",
          left : "+=3%",
          opacity : "-=0.07"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
        $bg2.stop(true,true).animate({
          width : "-=7%",
          left : "+=6%",
          top : "-=3%",
          opacity : "+=0.2"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
      }
      if(nowLevel==3){
        $bg1.stop(true,true).animate({
          width : "-=6%",
          left : "+=3%",
          opacity : "-=0.07"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
        $bg2.stop(true,true).animate({
          width : "-=7%",
          left : "+=6%",
          top : "-=3%",
          opacity : "+=0.2"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
        $bg3.stop(true,true).animate({
          top : "+=4%",
          opacity : "+=0.3"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
      }
      if(nowLevel==4){
        $bg1.stop(true,true).animate({
          width : "-=6%",
          left : "+=3%",
          opacity : "-=0.07"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
        $bg2.stop(true,true).animate({
          top : "+=12%"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
        $bg3.stop(true,true).animate({
          top : "+=12%"
        },20000/60,"linear",function(){flag = false;$('.runPos').css("display","none");$('.stopPos').css("display","block");});
      }
    }else{
    }
    clickNow++;
    if(nowLevel==1 && clickNow >= clickOneGoal){
      nowLevel =2;
    }
    if(nowLevel==2 && clickNow >= clickTwoGoal){
      nowLevel =3;
    }
    if(nowLevel==3 && clickNow >= clickThreeGoal){
      nowLevel =4;
    }
    if(nowLevel==4 && clickNow >= clickFourGoal){
      nowLevel =5;
    }
    if(nowLevel == 1){
    }else if(nowLevel == 2){
      $('.bg2').css("display","block");
    }else if(nowLevel == 3){
      $('.bg3').css("display","block");
    }else if(nowLevel == 5){
      clearInterval($timer);
      window.location.href = "game_win.html";
    }
  });


  (function($) {
    $.fn.nodoubletapzoom = function() {
        $(this).bind('touchstart', function preventZoom(e) {
          var t2 = e.timeStamp
            , t1 = $(this).data('lastTouch') || t2
            , dt = t2 - t1
            , fingers = e.originalEvent.touches.length;
          $(this).data('lastTouch', t2);
          if (!dt || dt > 500 || fingers > 1) return; // not double-tap

          e.preventDefault(); // double tap - prevent the zoom
          // also synthesize click events we just swallowed up
          $(this).trigger('click').trigger('click');
        });
    };
  })(jQuery);

});

$.scrollLock = ( function scrollLockClosure() {
    'use strict';

    var $html      = $( 'html' ),
        // State: unlocked by default
        locked     = false,
        // State: scroll to revert to
        prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop()
        },
        // State: styles to revert to
        prevStyles = {},
        lockStyles = {
            'overflow-y' : 'scroll',
            'position'   : 'fixed',
            'width'      : '100%'
        };

    // Instantiate cache in case someone tries to unlock before locking
    saveStyles();

    // Save context's inline styles in cache
    function saveStyles() {
        var styleAttr = $html.attr( 'style' ),
            styleStrs = [],
            styleHash = {};

        if( !styleAttr ){
            return;
        }

        styleStrs = styleAttr.split( /;\s/ );

        $.each( styleStrs, function serializeStyleProp( styleString ){
            if( !styleString ) {
                return;
            }

            var keyValue = styleString.split( /\s:\s/ );

            if( keyValue.length < 2 ) {
                return;
            }

            styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
        } );

        $.extend( prevStyles, styleHash );
    }

    function lock() {
        var appliedLock = {};

        // Duplicate execution will break DOM statefulness
        if( locked ) {
            return;
        }

        // Save scroll state...
        prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop()
        };

        // ...and styles
        saveStyles();

        // Compose our applied CSS
        $.extend( appliedLock, lockStyles, {
            // And apply scroll state as styles
            'left' : - prevScroll.scrollLeft + 'px',
            'top'  : - prevScroll.scrollTop  + 'px'
        } );

        // Then lock styles...
        $html.css( appliedLock );

        // ...and scroll state
        $( window )
            .scrollLeft( 0 )
            .scrollTop( 0 );

        locked = true;
    }

    function unlock() {
        // Duplicate execution will break DOM statefulness
        if( !locked ) {
            return;
        }

        // Revert styles
        $html.attr( 'style', $( '<x>' ).css( prevStyles ).attr( 'style' ) || '' );

        // Revert scroll values
        $( window )
            .scrollLeft( prevScroll.scrollLeft )
            .scrollTop(  prevScroll.scrollTop );

        locked = false;
    }

    return function scrollLock( on ) {
        // If an argument is passed, lock or unlock depending on truthiness
        if( arguments.length ) {
            if( on ) {
                lock();
            }
            else {
                unlock();
            }
        }
        // Otherwise, toggle
        else {
            if( locked ){
                unlock();
            }
            else {
                lock();
            }
        }
    };
}() );

$.scrollLock( true );
