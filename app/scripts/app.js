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

  $('#yp-add-btn').click(function() {
    // var player = new YT.Player('youtube-video');
    var url = $('.yp-video-container iframe').attr('src');
    var comment = $('#yp-post-area textarea').val();

    $.post('server/insert.php', {
      // TODO: don't send email directly, this is not safe.
      // Users can pretend to be someone else, send back the
      // auth token instead.
      email: user.email,
      content: comment,
      video: getVideoId(url),
      vtime: 20
    });
  });

  function getVideoId(url) {
    var idRegex = /youtube\.com\/watch\?v=(.*?)($|&)/i;
    var videoID = url.match(idRegex);
    if (videoID) {
      videoID = videoID[1];
    }
    return videoID;
  }

  function getYoutubeVideo(url) {
    var videoID = getVideoId(url);

    // TODO: use youtube api for creating the iframe/player
    return '<iframe src="https://www.youtube.com/embed/' + videoID + '" frameborder="0" enablejsapi="1" allowfullscreen></iframe>';
  }

  function login(user) {
    user = user;
    $('#yp-profile-img').empty().append('<img src="' + user.picture + '">');
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