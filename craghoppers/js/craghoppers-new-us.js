/*
	Craghoppers UK site specific JS snippets
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


	// Flexslider init
	if ($j('.flexslider').length) {
		setTimeout(function(){
          $j('.flexslider').flexslider();
        }, 500);
	}


	// Product Page Zoom and Scroller

  if ($j('body').hasClass('catalog-product-view')) {

    var magicCounter = 0;

    if (is_touch_device() == true) {
      var clickOrTouch = "touchstart";
    } else {
      var clickOrTouch = "click";
    }

    //Product Page Type Flag
    var productBreadcrumb = $j('.breadcrumbs .product strong').text();

    if(/trousers|Trousers|dress|Dress/.test(productBreadcrumb)) {
      $('.MagicToolboxSelectorsContainer').addClass('shift-left');
    }

    var magicReady = setInterval(function(){

      if ($j('.mcs-button-arrow-next').length) {

        var getZoomId = $('.mz-thumb-selected').attr('data-zoom-id');
        var getScrollId = $('.mz-thumb-selected').closest('.MagicScroll').attr('id');

        $j('.mcs-button-arrow-next').bind(clickOrTouch, function(){
          MagicZoom.next(getZoomId);
        });

        $j('.mcs-button-arrow-prev').bind(clickOrTouch, function(){
          MagicZoom.prev(getZoomId);
        });

        $j('.mz-thumb').bind(clickOrTouch, function(){
          MagicScroll.forward(getScrollId, 1)
        });

        clearInterval(magicReady);
      } else {
        $j('.MagicZoom').css('opacity', '1');
      }

      $j( window ).resize(function() {
        var zoomImgHeight = $j('.MagicZoom').height();
        $j('.MagicScroll').css('height', zoomImgHeight);
      }).resize();

      //failsafe to stop setInterval after 30 seconds
      magicCounter++;

      if (magicCounter >= 60) {
        clearInterval(magicReady);
        console.log('FAIL and interval cleared');
      }

    }, 500);

  }

	//Product Page Video Flag
	if ($j('.product-collateral .video').length < 1) {
		$j('.product-collateral .technologies-wrapper').addClass('technologies-wrapper--fullWidth');
	}

  //Product Page Social Share
  var pathname = document.URL;
  var summary = document.title;
  var facebook = "http://www.facebook.com/sharer/sharer.php?u=" + pathname;
  var google = "https://plus.google.com/share?url=" + pathname;
  var twitter = "https://twitter.com/intent/tweet?text=" + summary + "&url=" + pathname;
  $j("#twittershare").attr("href", twitter);
  $j("#fbshare").attr("href", facebook);
  $j("#googleshare").attr("href", google);

  //Lev Wood rearrange blocks - remove when promo ends

  $j( window ).resize(function() {

    if ($(window).width() < 769) {
      $j('.lw-sideBar').prependTo($j('.pageSection--social'));
    } else {
       $j('.lw-sideBar').prependTo($j('.lw-sectionContainer'));
    }
  }).resize();

  $j('.lw-hero__playButton').click(function(){
    var videoContainer = $j('.lw-video');

    $j('.lw-hero--film').css('background', '#949993');
    $j('.lw-hero__playButton').css('display', 'none');
    $j('.lw-hero--film').append(videoContainer);
    videoContainer.css('display', 'block');

    if ($(window).width() < 769) {
      $j('.lw-hero--film').css('height', 'auto');
    }

  });


  // Fit text tool-tip

  if ($j('body').hasClass('catalog-product-view')) {
    
    var fitTip = $j('<div class="fit-tip"><h2>Fit</h2><span id="fitTipClose">Close</span><p>All our garments are designed specifically for purpose. Our long standing <strong>"Classic Fit"</strong> is exactly what you would expect from everyday outdoor gear - slightly looser with a casual and relaxed feel.</p><p>For those who prefer to wander off track the <strong>"Adventure Fit"</strong> offers a slimmer fitting throughout for added comfort.</p><p>We then have <strong>"Active Fit"</strong>, this is essentially our Pro Stretch gear. Designed to contour the body with cutting in specific areas for a slim fitted feel.</p></div>');

    fitTip.appendTo('.product-clothing-fit');
    
    $j('.product-clothing-fit a').on('click', function(event){
      event.preventDefault();
      fitTip.css('display', 'block');
    });

    $j('#fitTipClose').on('click', function() {
      fitTip.css('display', 'none');
    });
  }

  /* Left Hand Nav show/hide */
  if ($j('#narrow-by-list').length) {

    $j('#narrow-by-list ol').each(function(){
      var numberOfSolrItems = $j(this).children().length;

      if (numberOfSolrItems > 5) {
        $j(this).children('li:nth-child(n+6)').css('display', 'none');
        $j(this).append('<p class="lhn-show-more-less"><a class="lhn-show-more-link">Show more +</a><a class="lhn-show-less-link">Show less -</a></p>');

        $j('.lhn-show-more-link').on('click', function(){
          $j(this).closest('ol').children('li:nth-child(n+6)').fadeIn(400);
          $j(this).css('display', 'none');
          $j(this).next('.lhn-show-less-link').css('display', 'block');
        });

        $j('.lhn-show-less-link').on('click', function(){
          $j(this).closest('ol').children('li:nth-child(n+6)').fadeOut(400);
          $j(this).css('display', 'none');
          $j(this).prev('.lhn-show-more-link').css('display', 'block');
        });
      }
    });  
  }

});
