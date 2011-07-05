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
    $('#friends-with-birthday').show();
    $('#login-button').hide();
    HappyBirthday.listFriends();
  } else {
    $('#friends-with-birthday').hide();
    $('#login-button').show();
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
