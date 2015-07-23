(function() {
  'use strict';
  /*jshint camelcase: false */

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
    gapi.auth.init(function() {
      setTimeout(checkAuth, 1);
    });
  };

  // Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
  // If the currently logged-in Google Account has previously authorized
  // the client specified as the clientID, then the authorization
  // succeeds with no user intervention. Otherwise, it fails and the
  // user interface that prompts for authorization needs to display.
  function checkAuth() {
    gapi.auth.authorize({
      client_id: clientID,
      scope: authScopes,
      immediate: true
    }, handleAuthResult);
  }

  // Handle the result of a gapi.auth.authorize() call.
  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      // Authorization was successful. Hide authorization prompts and show
      // content that should be visible after authorization succeeds.
      $('.yp-login').hide();
      loadAPIClientInterfaces();
    } else {
      // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
      // client flow. The current function is called when that flow completes.
      $('.yp-login').click(function() {
        gapi.auth.authorize({
          client_id: clientID,
          scope: authScopes,
          immediate: false
          }, handleAuthResult);
      });
    }
  }

  // Load the client interfaces for the YouTube Analytics and Data APIs, which
  // are required to use the Google APIs JS client. More info is available at
  // http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
  function loadAPIClientInterfaces() {
    gapi.client.load('youtube', 'v3', function() {
      handleAPILoaded();
    });
  }

  function handleAPILoaded() {
    // Fetch user's channel
    var list = gapi.client.youtube.channels.list({
      part: 'snippet', mine: true
    });

    list.execute(function(result){
      window.alert('Hello ' + result.items[0].snippet.title);
    });
  }

})();