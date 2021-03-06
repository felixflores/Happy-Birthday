(function() {
window.HappyBirthday = {};

HappyBirthday.listFriends = function() {
  var today = new Date(),
      currentDate = today.getDate(),
      currentMonth = today.getMonth() + 1;

  FB.api({
    method: 'fql.query',
    query: 'SELECT uid, first_name, last_name, birthday_date, pic_square, profile_url FROM user WHERE birthday_date != "" AND uid IN (SELECT uid1 FROM friend WHERE uid2 = me())' },

    function (friendsWithBirthday) {
      $('body').trigger('birthday-list-loading');

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

HappyBirthday.postToWall = function(uids, message) {
  $.each(uids, function(index, uid) {
    FB.api('/' + uid.value + '/feed', 'post', { message: message }, function(response) {
      if (!response || response.error) {
        console.log(response.error);
      }
    });

    $('body').trigger('birthday-wishes-posted');
  });
};

$(function() {
  var $friendWithBirthday = $('#friends-with-birthday'),
      $name = $('#name');

  function bindPicToolTip() {
    $friendWithBirthday.find('a').hover(
      function() {
        $name.html($(this).find('+ .name').html());
      },
      function() {
        $name.html('&nbsp;');
      }
    );
  };

  $friendWithBirthday.find('form').live('submit', function(e) {
    e.preventDefault();
    HappyBirthday.postToWall($(this).serializeArray(), $('#birthday-wish').val());
  });

  $('body').bind('birthday-list-loading', function() {
    $friendWithBirthday.find('ul').html("");
  });

  $('body').bind('birthday-list-loaded', function() {
    $friendWithBirthday.css('background', 'none');
    $friendWithBirthday.find('input').fadeIn(500);
    $friendWithBirthday.find('textarea').focus();

    if ($friendWithBirthday.find('li').length < 1) {
      $friendWithBirthday.find('ul').append("<li>No Birthdays Today Buddy</li>");
    }

    bindPicToolTip();
  });

  $('body').bind('birthday-wishes-posted', function() {
    $friendWithBirthday.html('Done!');
  });

  $('body').bind('birthday-found', function(e, user) {
    var friendInfo = "<a href=\"" + user.profile_url + "\" target=\"_blank\"><img class=\"pic\" src=\"" + user.pic_square + "\" /></a>";
    friendInfo += "<span class=\"name\">" + user.first_name + " " + user.last_name + "</span>";
    friendInfo += "<input type=\"hidden\" name=\"uid\" value=\"" + user.uid +"\" />";
    friendInfo += "<span class=\"remove\">Remove</span>";

    $friendWithBirthday.find('ul').append("<li>" + friendInfo + "</li>");
  });

  $('.remove').live('click', function() {
    $(this).parent('li').fadeOut(200, function() {
      $(this).remove();
    })
  });

});

})();
