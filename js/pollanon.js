Drupal.behaviors.pollanonHandleVoteView = function (context) {
    //Does this page contain poll form or poll results?
  if (typeof PollAnon == 'undefined') {
    return;
  }

  cookieName = 'pollanon-' + PollAnon.nid;
  ajahUrl = PollAnon.ajahBase + PollAnon.nid;

  //Form element is hidden by CSS to prevent flashing on switching to result display
  $('form.pollanon').fadeIn('fast');
  
  if ($.cookie(cookieName)) {
    //Cookie exists: This anonymous user has already submitted the given poll
    $hiddenResults = $('.pollanon-poll-results.hidden');
    if ($hiddenResults.length > 0) {
      //Hide poll form
      $('form.pollanon .vote-form').hide();
      //Display results
      //$hiddenResults.removeClass('hidden');
      if ($('.loading', $hiddenResults).length > 0) {
        $hiddenResults.load(ajahUrl, function() {
          $('.loading', $hiddenResults).remove();
        });
      }
      $hiddenResults.fadeIn('fast');
    }
  }
  else {
    //User might be submitting the poll form
    ua = navigator.userAgent;
    uaI = Math.floor(ua.length/2);
    pollanonKey = ua? ua.substring(uaI, uaI+2) + ua.length : '';
    $.cookie('pollanon-submit', pollanonKey, {path: '/'});
    $('form.pollanon input[name="pollanonkey"]', context).attr('value', pollanonKey);
  }
  
};
