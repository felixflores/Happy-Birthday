(function() {
window.HappyBirthday = {};

HappyBirthday.friendsList = function() {
  var today = new Date(),
      currentDate = today.getDate(),
      currentMonth = today.getMonth() + 1;

  FB.api({
    method: 'fql.query',
    query: 'SELECT uid, first_name, last_name, birthday_date, pic_square FROM user WHERE birthday_date != "" AND uid IN (SELECT uid1 FROM friend WHERE uid2 = me())' },

    function (friendsWithBirthday) {
      $.each(friendsWithBirthday, function(index, friend) {
        var birthdayArray = friend.birthday_date.split('/'),
            userBirthdayMonth = parseInt(birthdayArray[0]),
            userBirthdayDate = parseInt(birthdayArray[1]);

        if(userBirthdayMonth === currentMonth && userBirthdayDate === currentDate) {
          HappyBirthday.insertToBirthdayList(friend);
        }
      });

      if ($('#friends-with-birthday li').length < 1) {
        $('#friends-with-birthday ul').append("<li>No Birthdays Today Buddy</li>");
      }

      $('#friends-with-birthday').show();
    }
  );
};

HappyBirthday.insertToBirthdayList = function(user) {
  var friendInfo = "<img src=\"" + user.pic_square + "\" />";
  friendInfo += "<span class=\"name\">" + user.first_name + " " + user.last_name + "</span>";
  friendInfo += "<textarea rows=\"2\" cols=\"20\" name=\"birthday_wish_" + user.uid + "\"> Happy Birthday :)</textarea>";

  $('#friends-with-birthday ul').append("<li>" + friendInfo + "</li>");
};

HappyBirthday.postToWall = function(birthdayWishes) {
  $.each(birthdayWishes, function(index, birthdayWish) {
    var uid = birthdayWish.name.split('_')[2],
        message = birthdayWish.value;

    FB.api('/' + uid + '/feed', 'post', { message: message }, function(response) {
      if (!response || response.error) {
        console.log(response.error);
      }
    });
  });
};

HappyBirthday.done = function() {
  $('#friends-with-birthday').html('Done!');
};

$(function() {
  $('#friends-with-birthday form').live('submit', function(e) {
    e.preventDefault();
    HappyBirthday.postToWall($(this).serializeArray());
    HappyBirthday.done();
  });
});

})();
