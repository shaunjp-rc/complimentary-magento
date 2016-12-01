/*
  Hawkshead site specific JS snippets
*/


 var $j = jQuery.noConflict();

$j(document).ready(function($) {


  //Nasty hack to make AJAX cart work

  try {

    if ($j(AmAjaxObj).length) {

      $j('.btn-cart').on('click', function(){

        $j(this).removeAttr('onclick');
        
      });
    }
  }
  catch (err) {
    console.log('AJAX basket failed to load');
    ga('send', 'event', 'AJAX Cart Fail', 'load', err);
  }

});