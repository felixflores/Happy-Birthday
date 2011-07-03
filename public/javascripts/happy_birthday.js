(function() {
window.HappyBirthday = {};

HappyBirthday.listFriends = function() {
  var today = new Date(),
      currentDate = today.getDate(),
      currentMonth = today.getMonth() + 1;

  FB.api({
    method: 'fql.query',
    query: 'SELECT uid, online_presence, first_name, last_name, birthday_date, pic_square FROM user WHERE birthday_date != "" AND uid IN (SELECT uid1 FROM friend WHERE uid2 = me())' },

    function (friendsWithBirthday) {
      $.each(friendsWithBirthday, function(index, friend) {
        var birthdayArray = friend.birthday_date.split('/'),
            userBirthdayMonth = parseInt(birthdayArray[0]),
            userBirthdayDate = parseInt(birthdayArray[1]);

        if(userBirthdayMonth === currentMonth && userBirthdayDate === currentDate) {
          $('body').trigger('birthday-found', friend);
        }
      });

      $('body').trigger('birthday-list-loaded');
    }
  );
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

    $('body').trigger('birthday-wishes-posted');
  });
};

$(function() {
  var $friendWithBirthday = $('#friends-with-birthday');

  $friendWithBirthday.find('form').live('submit', function(e) {
    e.preventDefault();
    HappyBirthday.postToWall($(this).serializeArray());
  });

  $('body').bind('birthday-list-loaded', function() {
    $('#friends-with-birthday').css('background', 'none');

    if ($friendWithBirthday.find('li').length < 1) {
      $$friendWithBirthday.find('ul').append("<li>No Birthdays Today Buddy</li>");
    }
  });

  $('body').bind('birthday-wishes-posted', function() {
    $friendWithBirthday.html('Done!');
  });

  $('body').bind('birthday-found', function(e, user) {
    var friendInfo = "<img src=\"" + user.pic_square + "\" />";
    friendInfo += "<span class=\"name\">" + user.first_name + " " + user.last_name + "</span>";
    friendInfo += "<textarea rows=\"2\" cols=\"20\" name=\"birthday_wish_" + user.uid + "\"> Happy Birthday :)</textarea>";

    $friendWithBirthday.find('ul').append("<li>" + friendInfo + "</li>");
  });
});

})();
