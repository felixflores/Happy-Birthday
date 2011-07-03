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
    HappyBirthday.friendsList();
  } else {
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
