(function() {
$(function() {

FB.init({
  appId:    AppConfig.facebook.appId,
  cookie:   true,
  status:   true,
  xfbml:    true
});

var toggleLoginButton = function(status) {
  if (status === "connected") {
    $('#login-button').hide();
    $('#friends-with-birthday').show();
    HappyBirthday.listFriends();
  } else {
    $('#login-button').show();
    $('#friends-with-birthday').hide();
  }
}

FB.getLoginStatus(function(response) {
  toggleLoginButton(response.status);
});


FB.Event.subscribe("auth.sessionChange", function(response) {
  toggleLoginButton(response.status);
});

});
})();
