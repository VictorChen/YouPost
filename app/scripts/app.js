(function($) {
  'use strict';

  // Cache DOM elements
  var $urlInput = $('.yp-url');
  var $videoContainer = $('.yp-video-container');
  var user;
  
  $('.yp-watch').click(function() {
    var url = $.trim($urlInput.val());
    if (url) {
      $videoContainer.empty().append(getYoutubeVideo(url));
    }
  });

  function getYoutubeVideo(url) {
    var idRegex = /youtube\.com\/watch\?v=(.*?)($|&)/i;
    var videoID = url.match(idRegex);

    if (videoID) {
      videoID = videoID[1];
    }

    return '<iframe src="https://www.youtube.com/embed/' + videoID + '" frameborder="0" allowfullscreen></iframe>';
  }

  function login(user) {
    user = user;
    console.log(user);
  }

  function logout() {
    user = null;
  }

  window.youpost = {
    login: login,
    logout: logout
  };

})(jQuery);