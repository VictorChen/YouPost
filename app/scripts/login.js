(function($, youpost) {
  'use strict';

  // Google api
  var gapi;

  // The client ID is obtained from the Google Developers Console
  // at https://console.developers.google.com/.
  // If you run this code from a server other than http://localhost,
  // you need to register your own client ID.
  var clientID = '21479359250-a59luaulhnmd9o6kpeqtqoa7oo5jfgiq.apps.googleusercontent.com';

  var authScopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  // Upon loading, the Google APIs JS client automatically invokes 
  // this callback.
  window.googleApiClientReady = function() {
    gapi = window.gapi;
    gapi.auth.init(function() {
      setTimeout(function() {
        checkAuth(true);
      }, 1);
    });

    attachEvents();
  };

  function checkAuth(immediate) {
    /*jshint camelcase: false */
    gapi.auth.authorize({
      client_id: clientID,
      scope: authScopes,
      immediate: immediate,
      cookie_policy: 'single_host_origin'
    }, handleAuthResult);
  }

  function attachEvents() {

    // Make the login clickable. Attempt a non-immediate OAuth 2.0
    // client flow.
    $('.yp-login').click(function() {
      checkAuth(false);
    });

    $('.yp-logout').click(function() {
      $('.yp-welcome-user').addClass('hidden');
      $('.yp-username').text('');
      $('.yp-login').removeClass('hidden');
      $('.yp-logout').addClass('hidden');
      gapi.auth.signOut();
      youpost.logout();
    });
  }

  // Handle the result of a gapi.auth.authorize() call.
  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      // Authorization was successful. Hide authorization prompts and show
      // content that should be visible after authorization succeeds.
      $('.yp-login').addClass('hidden');
      $('.yp-logout').removeClass('hidden');
      retrieveUserInfo();
    } else {
      attachEvents();
    }
  }

  function retrieveUserInfo() {
    /*jshint camelcase: false */

    var accessToken = gapi.auth.getToken().access_token;
    var url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken;

    $.getJSON(url, function(userProfile) {
      $('.yp-welcome-user').removeClass('hidden');
      $('.yp-username').text(userProfile.name);
      youpost.login(userProfile);
    });
  }

})(window.jQuery, window.youpost);