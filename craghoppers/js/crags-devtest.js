var $j = jQuery.noConflict();

$j(document).ready(function($) {

  // Kit Guide
  

  //get started
  $j('.kitGuideButton--getStarted').on('click', function(){
    $j('.kitGuideForm').css('display', 'block');
    $j('.kitGuideForm__fieldset--focus').slideDown(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length) {
        $j('.kitGuideWidget').slideUp(500);
      }
    });
  });


  //focus selection actions
  $j('#focusActivity').on('click', function(){
    $j('.kitGuideForm__fieldset--travel, .kitGuideForm__fieldset--gender').slideUp(500);
    $j('.kitGuideForm__fieldset--activity').slideDown(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length) {
        $j('.kitGuideForm__fieldset--focus').slideUp(500);
      }
    });
  });

  $j('#focusTravel').on('click', function(){
    $j('.kitGuideForm__fieldset--activity, .kitGuideForm__fieldset--gender').slideUp(500);
    $j('.kitGuideForm__fieldset--travel').slideDown(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length) {
        $j('.kitGuideForm__fieldset--focus').slideUp(500);
      }
    });
  });

  // $j('#focusEveryday').on('click', function(){
  //   $j('.kitGuideForm__fieldset--activity, .kitGuideForm__fieldset--travel').slideUp(500);
  //   $j('.kitGuideForm__fieldset--gender').slideDown(500);
  // });


  //next step selections
  $j('.kitGuideButton--next').on('click', function(){
    $j('.kitGuideForm__fieldset--gender').slideDown(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length) {
        $j('.kitGuideForm__fieldset--travel, .kitGuideForm__fieldset--activity').slideUp(500);
      }
    });
  });

  $j('.kitGuideForm__fieldset--gender input').on('click', function(){
    $j('.kitGuideForm__helpText, .kitGuideButton--submit, .kitGuideForm__fieldset--gender .kitGuideButton--reset').fadeIn(500);
  });

  // reset travel or activity if both are used

  $j('.kitGuideForm__fieldset--travel input').on('click', function(){
    $('input[name="activity"]').prop('checked', false);
  });
  
  $j('.kitGuideForm__fieldset--activity input').on('click', function(){
    $('input[name="travel"]').prop('checked', false);
  });

  $j('.kitGuideButton--reset').on('click', function(){
    $j('.kitGuideForm__fieldset--gender, .kitGuideForm__fieldset--travel, .kitGuideForm__fieldset--activity').slideUp(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length) {
        $j('.kitGuideWidget').slideDown(500);
      }
    });
    $j('.kitGuideForm__helpText, .kitGuideButton--submit, .kitGuideForm__fieldset--gender .kitGuideButton--reset').fadeOut(100);
  });



  //hijack normal form functionality to create a URL from answers
  $j('#kitGuideForm').submit(function(event){

    //get form values and add to array
    var kitGuideAnswers = $j(this).serializeArray();

    event.preventDefault();


    //get individual objects
    var kitAnswerGender = $j.grep(kitGuideAnswers, function(element, index) {
      return element.name == 'gender';
    });

    var kitAnswerTravel = $j.grep(kitGuideAnswers, function(element, index) {
      return element.name == 'travel';
    });

    var kitAnswerActivity = $j.grep(kitGuideAnswers, function(element, index) {
      return element.name == 'activity';
    });



    //get values & build URL
    var kitUrlGender = kitAnswerGender[0].value;

    if (kitAnswerTravel.length) {
      var kitUrlTravel = '-' + kitAnswerTravel[0].value;
      var kitUrlFinal = 'http://www.craghoppers.com/' + kitUrlGender + kitUrlTravel;
    } else if (kitAnswerActivity.length) {
      var kitUrlActivity = '-' + kitAnswerActivity[0].value;
      var kitUrlFinal = 'http://www.craghoppers.com/' + kitUrlGender + kitUrlActivity;
    } else {
      var kitUrlFinal = 'http://www.craghoppers.com/' + kitUrlGender;
    }


    // if (kitAnswerActivity.length === 1) {
    //   var kitUrlActivity = '?solr_activity_type=' + kitAnswerActivity[0].value;
    // } else if (kitAnswerActivity.length > 1) {
    //   var kitUrlActivityArray = [];

    //   $j.each(kitAnswerActivity, function(key, value) {
    //     // return kitUrlActivityValue = value.value;
    //     kitUrlActivityArray.push(value.value);
    //   });

    //   var kitUrlActivity = '?solr_activity_type=' + kitUrlActivityArray.join('%2C');

    // } else {
    //   var kitUrlActivity = '';
    // }


    //build url

    // kitUrlFinal = 'http://www.craghoppers.com/' + kitUrlGender + kitUrlTravel + kitUrlActivity;

    // add url to form and submit

    console.log(kitUrlFinal);

    $j('#kitGuideForm button').attr('formaction', kitUrlFinal);

  });

  
});
