(function() {
  'use strict';
  /*jshint camelcase: false */

  // Google api
  var gapi;

  // The client ID is obtained from the Google Developers Console
  // at https://console.developers.google.com/.
  // If you run this code from a server other than http://localhost,
  // you need to register your own client ID.
  var clientID = '21479359250-a59luaulhnmd9o6kpeqtqoa7oo5jfgiq.apps.googleusercontent.com';

  var authScopes = [
    'https://www.googleapis.com/auth/youtube.readonly'
  ];

  // Upon loading, the Google APIs JS client automatically invokes 
  // this callback.
  window.googleApiClientReady = function() {
    gapi = window.gapi;
    attachEvents();
  };

  function attachEvents() {
    // Make the login clickable. Attempt a non-immediate OAuth 2.0
    // client flow.
    $('.yp-login').click(function() {
      gapi.auth.authorize({
        client_id: clientID,
        scope: authScopes,
        immediate: false,
        cookie_policy: 'single_host_origin'
        }, handleAuthResult);
    });

    $('.yp-logout').click(function() {
      $('.yp-welcome-user').addClass('hidden');
      $('.yp-username').text('');
      $('.yp-login').removeClass('hidden');
      $('.yp-logout').addClass('hidden');
      gapi.auth.signOut();
    });
  }

  // Handle the result of a gapi.auth.authorize() call.
  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      // Authorization was successful. Hide authorization prompts and show
      // content that should be visible after authorization succeeds.
      $('.yp-login').addClass('hidden');
      $('.yp-logout').removeClass('hidden');
      loadAPIClientInterfaces();
    }
  }

  // Load the client interfaces for the YouTube Analytics and Data APIs, which
  // are required to use the Google APIs JS client. More info is available at
  // http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
  function loadAPIClientInterfaces() {
    gapi.client.load('youtube', 'v3', function() {
      // Fetch user's channel
      var list = gapi.client.youtube.channels.list({
        part: 'snippet', mine: true
      });

      list.execute(function(result) {
        var username = result.items[0].snippet.title;
        $('.yp-welcome-user').removeClass('hidden');
        $('.yp-username').text(username);
      });
    });
  }

})();