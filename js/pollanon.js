Drupal.behaviors.pollanonHandleVoteView = function (context) {
    //Does this page contain poll form or poll results?
  if (typeof PollAnon == 'undefined') {
    return;
  }

  cookieName = 'pollanon-' + PollAnon.nid;

  //Form element is hidden by CSS to prevent flashing on switching to result display
  $('form.pollanon').fadeIn('fast');
  
  if ($.cookie(cookieName)) {
    //Cookie exists: This anonymous user has already submitted the given poll
    $hiddenResults = $('.pollanon-poll-results.hidden');
    if ($hiddenResults.length > 0) {
      //Hide poll form options and button
      $poll_form = $('form.pollanon .vote-form');
      $('.form-radios, .form-submit', $poll_form).hide();
      //Display results
      $hiddenResults.hide(); //Needs to be hidden by jQuery for the fadeIn() to work
      $hiddenResults.removeClass('hidden'); //Remove CSS hiding
      $hiddenResults.fadeIn('fast'); //Show element with an animation
    }
  }
  else {
    //User might be submitting the poll form
    ua = navigator.userAgent;
    uaI = Math.floor(ua.length/2);
    pollanonKey = ua? ua.substring(uaI, uaI+2) + ua.length : '';
    pollanonKey += '-' + new Date().getTime();
    $.cookie('pollanon-submit', pollanonKey, {path: '/'});
    $('form.pollanon input[name="pollanonkey"]', context).attr('value', pollanonKey);
  }

  msg = $.cookie('pollanon-messages');
  if (msg) {
    msg = unescape(msg.replace(/\+/g, " "));
    $('form.pollanon').before('<div class="messages status">'+msg+'</div>');
    $.cookie('pollanon-messages', null); //Remove message cookie
  }
  
};

