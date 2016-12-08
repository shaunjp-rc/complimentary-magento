/*
  Hawkshead site specific JS snippets
*/


 var $j = jQuery.noConflict();

$j(document).ready(function($) {


  $j('.block-title').click(function() {
    $j('#narrow-by-list').toggleClass('no-display');
    $j('.block-title').toggleClass('block-title--open');
  });

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