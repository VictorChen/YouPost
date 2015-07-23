(function($) {
  'use strict';

  var $urlInput;
  var $watchBtn;
  var $videoContainer;

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