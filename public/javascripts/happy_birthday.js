(function() {
var HappyBirthday = {
  views: {}
};

HappyBirthday.friendsList = function() {
  var today = new Date(),
      currentDate = today.getDate(),
      currentMonth = today.getMonth() + 1;

  FB.api({
    method: 'fql.query',
    query: 'SELECT first_name, last_name, birthday_date, uid FROM user WHERE birthday_date != "" AND uid IN (SELECT uid1 FROM friend WHERE uid2 = me())' },

    function (friendsWithBirthday) {
      $.each(friendsWithBirthday, function(index, friend) {
        var birthdayArray = friend.birthday_date.split('/'),
            userBirthdayMonth = parseInt(birthdayArray[0]),
            userBirthdayDate = parseInt(birthdayArray[1]);

        if(userBirthdayMonth === currentMonth && userBirthdayDate === currentDate) {
          HappyBirthday.views.insertToBirthdayList(friend);
        }
      });
    }
  );
};

HappyBirthday.views.insertToBirthdayList = function(user) {
  $('#friends-with-birthday').append("<li>" + user.first_name + " " + user.last_name + "</li>");
};

HappyBirthday.postToWall = function(friendsWithBirthdayMessages) {
  $.each(friendsWithBirthdayMessages, function(index, friendWithBirthdayMessage) {
    FB.api('/me/feed', 'post', { message: "Testing..." }, function(response) {
      if (!response || response.error) {
        console.log(response.error);
      }
    });
  });
};

HappyBirthday.friendsList();

})();
