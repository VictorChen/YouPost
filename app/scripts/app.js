(function($) {
  'use strict';

  var user;
  var $urlInput;
  var $watchBtn;
  var $videoContainer;

  /**
   * Callback for google's sign in button
   * @param  {Object} googleUser google's user object
   */
  window.loginUser = function(googleUser) {
    // Useful data for your client-side scripts:
    user = googleUser.getBasicProfile();
    console.log("ID: " + user.getId()); // Don't send this directly to your server!
    console.log("Name: " + user.getName());
    console.log("Image URL: " + user.getImageUrl());
    console.log("Email: " + user.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }

  function getYoutubeVideo(url) {
    var idRegex = /youtube\.com\/watch\?v=(.*?)($|&)/i;
    var videoID = url.match(idRegex);

    if (videoID) {
      videoID = videoID[1];
    }

    return '<iframe src="https://www.youtube.com/embed/' + videoID + '" frameborder="0" allowfullscreen></iframe>';
  }

  $(function() {
    $urlInput = $('.yp-url');
    $watchBtn = $('.yp-watch');
    $videoContainer = $('.yp-video-container');

    $watchBtn.click(function() {
      var url = $.trim($urlInput.val());

      if (url) {
        $videoContainer.empty();
        $videoContainer.append(getYoutubeVideo(url));
      }
    });
  });

})(jQuery);