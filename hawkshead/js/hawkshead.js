/*
	Hawkshead site specific JS snippets
 */

// Check for touch device - not entirely reliable. Using in combination with screen size checks in css

function is_touch_device() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

if (is_touch_device() == true) {
	document.getElementsByTagName( 'html' )[0].classList.add('isTouch');
}

var $j = jQuery.noConflict();

$j(document).ready(function($) {

  	// Product Page
    if ($j('body').hasClass('catalog-product-view')) {

      var magicCounter = 0;

      if (is_touch_device() == true) {
        var clickOrTouch = "touchstart";
      } else {
        var clickOrTouch = "click";
      }


      //zoom and scroller
      var magicReady = setInterval(function(){

        if ($j('.mcs-button-arrow-next').length) {

          setTimeout(function(){
            var winWidth = $j(window).width();

            $j( window ).resize(function() {
              var thumbImgHeight = parseInt($j('.mz-thumb img').height());
              
              $j('.MagicScroll').css('height', thumbImgHeight + 20);

            }).resize();
          
          }, 700);

          clearInterval(magicReady);
        }

        //failsafe to stop setInterval after 30 seconds
        magicCounter++;
        if (magicCounter >= 60) {
          clearInterval(magicReady);
          console.log('Scroll not loaded and interval cleared');
        }

      }, 200);

      if($j(".review_summary_block .reviewslink").length != 0) {
        $j("#reviews_contents").append($j(".review_summary_block"));
      } else {
        $j("#reviews_contents").append("No reviews");
      }

    }

  /*Moving size selection on mobile*/

  setTimeout(function(){
    
    if ($(window).width() < 501) {
        $j( ".product-options-quantity" ).insertAfter( $j( ".product-options" ) );
    };

    $j( window ).resize(function() {

      if ($(window).width() < 501) {
        $j( ".product-options-quantity" ).insertAfter( $j( ".product-options" ) );
      } else {
        $j( ".product-options-quantity" ).insertAfter( $j( ".email-friend" ) );
      }

    }).resize();
  }, 9000);

});