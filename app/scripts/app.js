(function($) {
  'use strict';

  // Cache DOM elements
  var $urlInput = $('.yp-url');
  var $postBox = $('#yp-post-area textarea');
  var $addBtn = $('#yp-add-btn');
  var $recentPosts = $('.yp-recent-posts');
  var timeoutId;

  var user; // current user info
  var player; // current youtube player

  function getVideoId(url) {
    var idRegex = /youtube\.com\/watch\?v=(.*?)($|&)/i;
    var videoID = url.match(idRegex);
    if (videoID) {
      videoID = videoID[1];
    }
    return videoID;
  }

  function createPost(post) {
    // TODO: would be cleaner to use a template library
    return '<div class="post clearfix">' +
             '<div class="post-email" title="' + post.email + '">' +
               post.email +
             '</div>' +
             '<div class="post-content">' +
               post.content +
             '</div>' +
             '<div class="post-footer">' +
               '<div class="post-time">' +
                 post.vtime +
               '</div>' +
               '<div class="post-date">' +
                 post.timestamp +
               '</div>' +
               '<div class="post-like">' +
                 post.like +
                 '<button class="glyphicon glyphicon-thumbs-up"' +
                 'aria-hidden="true"></button>' +
                 '<button class="glyphicon glyphicon-thumbs-down"' +
                 'aria-hidden="true"></button>' +
               '</div>' +
           '</div>';
  }

  function displayRecentPosts(data) {
    $recentPosts.empty();
    $.each(data, function(index, post) {
      var postHtml = createPost(post);
      $recentPosts.append(postHtml);
    });
  }

  function startFetching() {
    /*jshint camelcase: false */

    $.getJSON('server/recent.php', {
      video: player.getVideoData().video_id,
      vtime: player.getCurrentTime()
    }).done(function(data) {
      displayRecentPosts(data);
      timeoutId = setTimeout(startFetching, 5000);
    });
  }

  function stopFetching() {
    clearTimeout(timeoutId);
  }

  function onPlayerStateChange(state) {
    if (state.data === YT.PlayerState.PLAYING) {
      startFetching();
    } else if (state.data === YT.PlayerState.PAUSED ||
      state.data === YT.PlayerState.ENDED) {
      stopFetching();
    }
  }

  function login(ytUser) {
    user = ytUser;
    $('#yp-profile-img').empty().append('<img src="' + user.picture + '">');
    console.log(user);
  }

  function logout() {
    user = null;
  }

  window.onYouTubeIframeAPIReady = function() {
    /*jshint camelcase: false */

    player = new YT.Player('player', {
      videoId: 'i5ZM0-f5_CU', // default video
      playerVars: {
        iv_load_policy: 3 // turn off annotations
      },
      events: {
        onStateChange: onPlayerStateChange
      }
    });
  };
  
  $('.yp-watch').click(function() {
    var url = $.trim($urlInput.val());
    if (url) {
      player.loadVideoById(getVideoId(url));
    }
  });

  $addBtn.click(function() {
    /*jshint camelcase: false */

    if (!user) {
      window.alert('Please log in first!');
      return;
    }

    if ($addBtn.hasClass('disabled')) {
      return;
    }

    var comment = $postBox.val();
    $addBtn.addClass('disabled');
    $postBox.attr('disabled', 'disabled');

    $.post('server/insert.php', {
      // TODO: don't send email directly, this is not safe.
      // Users can pretend to be someone else, send back the
      // auth token instead.
      email: user.email,
      content: comment,
      video: player.getVideoData().video_id,
      vtime: player.getCurrentTime()
    }).done(function() {
      $addBtn.removeClass('disabled');
      $postBox.removeAttr('disabled').val('');
    });
  });

  window.youpost = {
    login: login,
    logout: logout
  };

})(jQuery);