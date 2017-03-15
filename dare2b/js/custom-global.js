/*//////////////////////////////////////////////
// DARE 2B CUSTOM GLOBAL JS FILE
// AUTHOR: Shaun Pelling
//////////////////////////////////////////////*/

/*///////////// FOOTER JS //////////////*/

jQuery(document).ready(function(){

    jQuery("#email-signup a").click(function(){
        var email = jQuery("#email-signup input").val();
        var formLocation = "https://www.dare2b.com/emailsignup?email=" + email;
        window.location = formLocation;
    });

    jQuery('.sizeSelector').on('change', function() {
      jQuery(this).closest( '.quickbuy' ).find( '.optionvalue' ).val(  this.value );
      jQuery(this).closest( '.quickbuy' ).find( '.btn-cart' ).removeAttr('disabled');
      jQuery(this).closest( '.quickbuy' ).find( '.disableBut' ).remove();
    });

});


// RESIZE PRODUCT GRI LIST ITEMS TO ALL MATCH

function liResize(){

    var maxHeight = 0;
    jQuery(".catalog-category-view li.item").css({minHeight: 0});

    jQuery.each(jQuery(".catalog-category-view li.item"), function(key, val){

        if(jQuery(val).height() > maxHeight){

            maxHeight = jQuery(val).height();

        }

    });

    jQuery(".catalog-category-view .category-products li.item").css({ minHeight: maxHeight });

}

jQuery(window).load(function(){

  //PRODUCT PAGE ALT IMAGE SCROLLER
  var altPos = 0;
  var altArrows = "<span class='altArrow next'>></span><span class='altArrow prev'><</span>";
  var altItems = jQuery('.MagicToolboxSelectorsContainer > div');

  jQuery('.MagicToolboxSelectorsContainer').append(altArrows);
  jQuery('.MagicToolboxSelectorsContainer .altArrow').on('click', function(){
    if (jQuery(this).hasClass('next')){
      if (altPos < ( jQuery('.MagicToolboxSelectorsContainer > div > a').length / 2 - 1 )){
        altPos++;
        altItems.animate({top: (altPos * -100)});
      } else {
        altPos = 0;
        altItems.animate({top: (altPos * -100)});
      } 
    } else {
      if (altPos > 0){
        altPos--;
        altItems.animate({top: (altPos * -100)});
      } else {
        altPos = 0;
        altItems.animate({top: (altPos * -100)});
      }

    }

  });

  //PRODUCT PAGE ALT IMAGE SCROLLER
  var altCPos = 0;
  var altCArrows = "<span class='altArrow next'>></span><span class='altArrow prev'><</span>";
  var altCItems = jQuery('.box-collateral.box-related > ul');

  jQuery('.box-collateral.box-related').append(altCArrows);
  jQuery('.box-collateral.box-related .altArrow').on('click', function(){
    if (jQuery(this).hasClass('next')){
      if (altCPos < ( jQuery('.box-collateral.box-related ul > li').length - 1 )){
        altCPos++;
        altCItems.animate({top: (altCPos * -100)});
      } else {
        altCPos = 0;
        altCItems.animate({top: (altCPos * -100)});
      } 
    } else {
      if (altCPos > 0){
        altCPos--;
        altCItems.animate({top: (altCPos * -100)});
      } else {
        altCPos = 0;
        altCItems.animate({top: (altCPos * -100)});
      }

    }
  });


  //FIXED SCROLL
  if (jQuery('#narrow-by-list').length > 0){

    jQuery(window).on('scroll', function(){

      //FIX NAV ON SCROLL
      if(jQuery(window).scrollTop() > 40){
        jQuery('#narrow-by-list').addClass('fixed-nav');
      } else{
        jQuery('#narrow-by-list').removeClass('fixed-nav');
      }

    }); //end scroll event

  }//end if check

  if(jQuery('.related-products').length > 0){
    jQuery('.related-products').appendTo('.product-essential > form');
  }

  // SIDEBAR FILTER TOGGLE
  jQuery('.sidebar .block-title').click(function(){
    jQuery('.sidebar').toggleClass('open');
  });

  // MOVE SALE STRIP ABOVE SIDEBAR ON CAT PAGES

  if(jQuery(".catalog-category-view .new-colour-style").length > 0){
    jQuery(".catalog-category-view .new-colour-style").prependTo(".main");
  }

  // MOVE CUSTOMER LINKS IN HEADER

  jQuery(".topbar-container").prependTo(".header");

  // ADD LOGO WRAPPER FOR ALL NONE-HOME PAGES

  if (jQuery("h1.logo").length < 1){
    jQuery(".header a.logo").wrap("<h1 class='logo'></h1>");
  }

  // EXTRA 'REMOVE FILTERS' SECTION ON SIDEBAR

  jQuery("#narrow-by-list dd:first-of-type").after(jQuery(".sidebar .actions").clone());
  jQuery(".sidebar .actions a").text("Remove all Filters");

  liResize();

  // FOOTER SIGNUP

  jQuery(".footer-signup a").click(function(){

    var email = jQuery(".footer-signup input").val();
    var formLocation = "https://www.dare2b.com/emailsignup?email=" + email;
    window.location = formLocation;

  });


});


// FOOTER TOOGLES

jQuery(document).ready(function(){

  jQuery('.footcol h3').on('click', function(){
     jQuery(this).closest('.footcol').find('ul').toggleClass('open')
  });

  // MEGA MENU STUFF

  var megaOpen = false;
  jQuery(".mobileSearchButton").attr("src", "https://d2mhdcmxti8mqe.cloudfront.net/AW15/img/global/search.svg");
  jQuery(".mobileSearchButton").on("click", function(){
    if(megaOpen){
      jQuery(".header-container .header h1.logo").css({zIndex: 9999999999});
      jQuery(this).hide(0, function(){
        jQuery(this).attr("src", "https://d2mhdcmxti8mqe.cloudfront.net/AW15/img/global/search.svg")
        .css({
          right: 80,
          background: "none",
          top: "20%",
          height: "60%",
          width: "auto",
          padding: 0
        }).removeClass("open").show(0);
        megaOpen = false;
    });
    } else {
      jQuery(".header-container .header h1.logo").css({zIndex: 0});
      jQuery(this).hide(0, function(){
        jQuery(this).attr("src", "https://d2mhdcmxti8mqe.cloudfront.net/AW15/img/global/close.png")
        .css({
          right: "0 !important",
          background: "#2d2d2d",
          top: "0 !important",
          width: 70,
          height: "auto !important",
          padding: "7px 0"
        }).addClass("open").show(0);
        megaOpen = true;
      });
    }
  });

  jQuery(".ms-megamenu .anchor_mbmenu .anchor_mbmenu_text").on("click", function(){
    window.scrollTo(0, 0);
    if(jQuery(window).width() < 751 && jQuery(".header-container.xxoo #full-width-cat-banner").length > 0){
      jQuery(".header-container.xxoo #full-width-cat-banner").hide();
      jQuery(".page").css({paddingTop: 0});
    }

    jQuery(".megamenu").toggleClass("open");
    jQuery("#header").toggleClass('open');
    jQuery(".d2bMobileHeaderLinksWrapper").prepend("<div class='open-menu-icon'></div>");
    jQuery(".open-menu-icon").on("click", function(){
      jQuery(".header-container.xxoo #full-width-cat-banner").show();
      if(jQuery(window).width() < 751 && jQuery(".header-container.xxoo #full-width-cat-banner").length > 0){jQuery(".page").css({paddingTop: 30});}
      jQuery(".ms-topmenu").removeClass("active");
      jQuery(".anchor_mbmenu_text").removeClass("flag");
      jQuery(this).remove();
      jQuery(".megamenu").toggleClass("open");
    });
  });

}); //doc ready

jQuery(document).ready(function(){

  var filter;

    if(jQuery(window).width() < 770){

      jQuery('.category-products > .toolbar .count-container').detach().insertAfter('.category-products > .toolbar .sorter');
      jQuery('.catalog-category-view .col-left.sidebar').detach().insertBefore('.category-products > .toolbar .sorter');
      jQuery('.block-layered-nav .block-subtitle--filter').on('click', function(){
        jQuery('.toolbar .sidebar.col-left').toggleClass('active');
      });

      filter = true;

    } // end if

    jQuery(window).on('resize', function(){

        // if the window is mobile, and the filter is already mobile-active
        if(jQuery(window).width() < 770 && filter){


        // if the window is mobile, and the filter is not mobile-active
        } else if(jQuery(window).width() < 770 && !filter){

          jQuery('.category-products > .toolbar .count-container').detach().insertAfter('.category-products > .toolbar .sorter');
          jQuery('.catalog-category-view .col-left.sidebar').detach().insertBefore('.category-products > .toolbar .sorter');
          jQuery('.block-layered-nav .block-subtitle--filter').on('click', function(){
            jQuery('.toolbar .sidebar.col-left').toggleClass('active');
          });

          filter = true;

        // if the window is desktop, and the filter is mobile-active
        } else if(jQuery(window).width() > 769 && filter){

          jQuery('.category-products > .toolbar > .count-container').detach().appendTo('.category-products > .toolbar .pager');
          jQuery('.category-products > .toolbar > .col-left.sidebar').detach().insertAfter('.col-main');
          jQuery('.block-layered-nav .block-subtitle--filter').off('click', function(){
            jQuery('.toolbar .sidebar.col-left').toggleClass('active');
          });
          filter = false;

        }

      });

});