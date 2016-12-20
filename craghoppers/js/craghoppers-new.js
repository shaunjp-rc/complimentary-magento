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

  

  //Micro Site  - rearrange blocks

  $j( window ).resize(function() {

    if ($(window).width() < 769) {
      $j('.micro-sideBar').prependTo($j('.pageSection--social'));
    } else {
       $j('.micro-sideBar').prependTo($j('.micro-sectionContainer'));
    }
  }).resize();


  //Micro Site - Scroll Arrow

  if ($('.micro-hero__arrow').length) {

    $('.micro-hero__arrow').delay(1200).animate({
      bottom: '56px'
    }, 300, function(){
      $('.micro-hero__arrow').animate({
        bottom: '48px'
      }, 120, function(){
        $('.micro-hero__arrow').stop(true, true);
      });
      
    });

    var scrollBottomStart = $(window).scrollTop() + $(window).height();

    $(window).on('scroll', function(){

        var scrollBottom = $(window).scrollTop() + $(window).height(), //get y value of bottom of window
            nextSectionPos = $j('.micro-nextSection').offset().top; // get y value of top of next page section

        if ((scrollBottom > nextSectionPos + 48) || (scrollBottom > scrollBottomStart + 300)) {
          $('.micro-hero__arrow').css('display', 'none');
          $(window).off('scroll'); // stops the scroll event from constantly firing
        }

    });
  }
  

  $j('.micro-video__playButton').click(function(){
    var videoContainer = $j('.micro-video');

    $j('.micro-hero--what').css('background', '#ccc');
    $j('.micro-hero--what .micro-hero__logo, .micro-hero--what .micro-hero__title, .micro-hero--what .micro-hero__subtext, .micro-hero--what .micro-hero__quoteContainer').css('display', 'none');
    $j('.micro-hero--what').append(videoContainer);
    videoContainer.css({
      'position': 'absolute',
      'top': '10%',
      'left': 0,
      'display': 'block',
      'width': '100%'}
      );

    if ($(window).width() < 769) {
      $j('.micro-hero--what').css('height', 'auto');
    }

  });


  //Close Mega Menu when search is opened
  $j('.skip-search').click(function () {
    if ($j('.ms-topmenu').css('opacity') == '0') {
        $j('.ms-topmenu').css({
            'opacity': '1',
            'height' : 'auto',
            'z-index' : '99'
        });
    } else {
        $j('.ms-topmenu').css({
            'opacity': '0',
            'height' : '0px',
            'z-index' : '-99'
        });
    }
  });

  /* Customer service page mobile drop down */
  $j(".customerservice__mobile").click(function(){
        $j(".customerservice__links").toggle();
        $j(".customerservice__mobile").toggleClass("active");
  });

  /* mobile filter fix */

  $j("#narrow-by-list dt").click(function(){

    $j(".odd.current ol").toggle();
    $j(".even.current ol").toggle();

  });

  /* mobile filter fix END */

  /* Turned subtotal green when discount code is accepted */
  if($j('.success-msg').is(':visible')){
    $j("#shopping-cart-totals-table tfoot").css({"background-color": "#eff5ea", "border-left": "2px solid #11b400"});
  }
  /* END */


  // Fit text tool-tip

  if ($j('body').hasClass('catalog-product-view')) {
    
    //get which fit needs to be shown
    var getFit = $j('.product-clothing-fit a').text().replace(/\s/g, '');

    if(/trousers|Trousers|shorts|Shorts|Skirt|Skirts/.test(productBreadcrumb)) {
      var getFitType = 'lower';
    } else {
      var getFitType = 'upper';
    }

    // create full variable name
    var fitTipFull = 'fitTip' + getFit + getFitType;

    // create the appropriate tool tip
    if (getFit === 'Tailoredfit') {
      fitTipFull = $j('<div class="fit-tip"><span id="fitTipClose">Close</span><div class="fitGuideDiagrams__block"><img src="//d1khwdv4lze0nb.cloudfront.net/images/AW16/fit-guide/upper-body-tailored-fit.png" class="fitGuideDiagrams__image" /><h3 class="fitGuideDiagrams__fitTitle">Tailored Fit</h2><p class="fitGuideDiagrams__fitDesc">A regular cut slimmer through the chest, waist, hem &amp; sleeve.</p></div></div>');
    } else if (getFit === 'Adventurefit') {
      fitTipFull = $j('<div class="fit-tip"><span id="fitTipClose">Close</span><div class="fitGuideDiagrams__block"><img src="//d1khwdv4lze0nb.cloudfront.net/images/AW16/fit-guide/lower-body-adventure-fit.png" class="fitGuideDiagrams__image" /><h3 class="fitGuideDiagrams__fitTitle">Adventure Fit</h2><p class="fitGuideDiagrams__fitDesc">A regular cut with ease of movement sitting below the natural waistline.</p></div></div>');
    } else if (getFit === 'Activefit' && getFitType === 'upper') {
      fitTipFull = $j('<div class="fit-tip"><span id="fitTipClose">Close</span><div class="fitGuideDiagrams__block"><img src="//d1khwdv4lze0nb.cloudfront.net/images/AW16/fit-guide/upper-body-active-fit.png" class="fitGuideDiagrams__image" /><h3 class="fitGuideDiagrams__fitTitle">Active Fit</h2><p class="fitGuideDiagrams__fitDesc">Fitted cut with active styling and stretch fabric or detail.</p></div></div>');
    } else if (getFit === 'Activefit' && getFitType === 'lower') {
      fitTipFull = $j('<div class="fit-tip"><span id="fitTipClose">Close</span><div class="fitGuideDiagrams__block"><img src="//d1khwdv4lze0nb.cloudfront.net/images/AW16/fit-guide/lower-body-active-fit.png" class="fitGuideDiagrams__image" /><h3 class="fitGuideDiagrams__fitTitle">Active Fit</h2><p class="fitGuideDiagrams__fitDesc">Closer fitting cut with active styling and stretch fabric, sitting lower on the waist.</p></div></div>');
    } else if (getFit === 'Relaxedfit' && getFitType === 'upper') {
      fitTipFull = $j('<div class="fit-tip"><span id="fitTipClose">Close</span><div class="fitGuideDiagrams__block"><img src="//d1khwdv4lze0nb.cloudfront.net/images/AW16/fit-guide/upper-body-relaxed-fit.png" class="fitGuideDiagrams__image" /><h3 class="fitGuideDiagrams__fitTitle">Relaxed Fit</h2><p class="fitGuideDiagrams__fitDesc">Generous fit for comfort and freedom of movement.</p></div></div></div>');
    } else if (getFit === 'Relaxedfit' && getFitType === 'lower') {
      fitTipFull = $j('<div class="fit-tip"><span id="fitTipClose">Close</span><div class="fitGuideDiagrams__block"><img src="//d1khwdv4lze0nb.cloudfront.net/images/AW16/fit-guide/lower-body-relaxed-fit.png" class="fitGuideDiagrams__image" /><h3 class="fitGuideDiagrams__fitTitle">Relaxed Fit</h2><p class="fitGuideDiagrams__fitDesc">Generous fit for comfort and freedom of movement sitting on the natural waistline.</p></div></div>');
    }
    


    fitTipFull.appendTo('.product-clothing-fit');
    
    $j('.product-clothing-fit a').on('click', function(event){
      event.preventDefault();
      fitTipFull.css('display', 'block');
    });


    //generic close tip
    $j('#fitTipClose').on('click', function() {
      $j('.fit-tip').css('display', 'none');
    });
  }


  // Lev and Xmas Wood Sticky Nav
  
  if ( $j('html').hasClass('no-touch') && ($j('body').hasClass('cms-levisonwood') || $j('body').hasClass('cms-christmas')) ) {
      $j(window).on('scroll', function(){

        var fromTop = $j(window).scrollTop(),
          topOfNextBlock = $j('.lev-mainCopy, .xmas-mainCopy').offset().top;


        if (fromTop > topOfNextBlock) { 
          $j('.lev-sideBar--horizontal, .xmas-sideBar--horizontal').slideDown(300);
        } else {
          $j('.lev-sideBar--horizontal, .xmas-sideBar--horizontal').slideUp(300);
        }
    });
  }

  if ( $j('html').hasClass('touch') && ($j('body').hasClass('cms-levisonwood') || $j('body').hasClass('cms-christmas')) ) {
    var lastHeaderBlockPos = $j('.top-container').offset().top,
      lastHeaderBlockHeight = $j('.top-container').height(),
      endOfHeader = lastHeaderBlockPos + lastHeaderBlockHeight;
      console.log(endOfHeader);
      $j('.lev-sideBar--horizontal, .xmas-sideBar--horizontal').css({
        'position': 'relative',
        'float': 'left'
      });

      $j(window).on('scroll', function(){

        if ($j(window).scrollTop() > endOfHeader - 1) {
          $j('.lev-sideBar--horizontal, .xmas-sideBar--horizontal').css({
            'position': 'fixed',
            'top': 0
          });
        } else {
          $j('.lev-sideBar--horizontal, .xmas-sideBar--horizontal').css('position', 'relative');
        }
      });
  }

  $j('.lev-sideBar--horizontal__burger, .xmas-sideBar--horizontal__burger').on('click', function() {
    $j('.lev-sideBar__hiddenContainer, .xmas-sideBar__hiddenContainer').toggle('slow');
  });


  // Homepage Recs

  if ($j('body').hasClass('cms-index-index')) {
    var getLastTopCat = localStorage.getItem('lastTopCatVisit'),
        getLastSubCat = localStorage.getItem('lastSubCatVisit');

    if (getLastTopCat === 'Men' && getLastSubCat === 'Jackets') {
      $j('.pageSection__homepageRecs').addClass('pageSection__homepageRecs--Men-Jackets').removeClass('pageSection__homepageRecs');
    } else if (getLastTopCat === 'Women' && getLastSubCat === 'Jackets') {
      $j('.pageSection__homepageRecs').addClass('pageSection__homepageRecs--Women-Jackets').removeClass('pageSection__homepageRecs');
    }
  }


  $j('.productPageTechnologies, .amshopby-link script').remove();


  // fix to mobile solr filtering
  $j('.col-left .block-title').on('click', function(){
    $j('#narrow-by-list').toggleClass('display no-display');
  });

  $j('#narrow-by-list dt').on('click', function(){
    console.log('click dave');
    $j(this).next('dd').find('ol').css('display', 'block');
  });


  // Don't ask...

  if ($j('.kitGuideResultsContainer').length) {
    $j('body').addClass('kitGuideResultsPage');
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


  // Welcome Back Basket Message

  //set up some variables to check value of to decide if message should show or not
  var numInBasket = $j('.header-minicart .count').text();
  var wbbCookie = getCookie('welcomeBackBasket');
  var wbbReferrer = document.referrer;

  //make sure message only shows if there is something in customers basket, they dont have the cookie, they haven't come from another page on site, and they arent returning directly to basket or checkout pages
  if (numInBasket != 0 && wbbCookie != 'true' && wbbReferrer.indexOf("craghoppers.com") < 0 && window.location.pathname != "/checkout/cart/" && window.location.pathname != "/checkout/onepage/") {

    //create block for message
    var welcomeBackBasketBox = $j('<div id="welcomeBackBasketBox"><h3>Welcome Back <span class="welcomeBackBasketBox__close">X</span></h3><p>Last time you were here you added ' + numInBasket + ' items to your basket:</p><table class="welcomeBackBasketBox__items"></table><span class="welcomeBackBasketBox__extraItems"></span><span class="welcomeBackBasketBox__button welcomeBackBasketBox__close">Continue Shopping</span><a class="welcomeBackBasketBox__button welcomeBackBasketBox__button--basket" href="/checkout/cart/">Go to Basket</a></div>');
  
    //attach block to body on page load
    $j('body').append(welcomeBackBasketBox);  

    //scrape mini cart for product image and name and then create table cells to put them in before appending it to the table in welcomeBackBasketBox
    var wbBasketContents = $j('.mini-products-list li:nth-child(-n+2)').each(function(){
          var wbBasketImg = $j(this).find('img').clone();
          var wbBasketTitle = $j(this).find('.product-name').clone();

          var wbBasketCell1 = $j('<td class="wbc1"></td>');
          var wbBasketCell2 = $j('<td class="wbc2"></td>');
          var wbBasketRow = $j('<tr></tr>');

          wbBasketImg.appendTo(wbBasketCell1);
          wbBasketTitle.appendTo(wbBasketCell2);

          wbBasketCell1.appendTo(wbBasketRow);
          wbBasketCell2.appendTo(wbBasketRow);

          wbBasketRow.appendTo('.welcomeBackBasketBox__items');
        });

    if (numInBasket > 2) {
      var remainderInBasket = numInBasket - 2;
      $j('<p>... along with ' + remainderInBasket + ' more items.</p>').appendTo('.welcomeBackBasketBox__extraItems');
    }

    //now message is complete slide message in from the right. On completion set a cookie and send event to GA
    welcomeBackBasketBox.delay(300).animate({
      'right': '0'
    }, 1200, function(){
      document.cookie = "welcomeBackBasket=true";
      ga('send', 'event', 'Welcome Back Basket', 'shown');
    });


    //Slide message off screen and then remove it from DOM if customer clicks cross or Continue Shopping button. Send event to GA.
    $j('.welcomeBackBasketBox__close').on('click', function(){

      welcomeBackBasketBox.animate({
        'right': '-100%'
      }, 800, function(){

        welcomeBackBasketBox.detach();
      });

      ga('send', 'event', 'Welcome Back Basket', 'closed');
    });

    //Send event to GA if customer clicks Go to Basket
    $j('.welcomeBackBasketBox__button--basket').on('click', function(){
      ga('send', 'event', 'Welcome Back Basket', 'Go to Basket');  
    });
    
  }





});
