FB.init({
  appId:    '243685762324575',
  cookie:   true,
  status:   true,
  xfbml:    true
});

FB.api('/me/friends', function(friends) {
  if(friends !== null && friends !== undefined) {
    var friendsIds,
        today = new Date(),
        currentDate = today.getDate(),
        currentMonth = today.getMonth() + 1;

    friendsIds = $.map(friends.data, function(value, index) {
      return value.id;
    });

    $.each(friendsIds, function(index, value) {
      FB.api('/' + value, function(resp) {
        if(resp.birthday !== null && resp.birthday !== undefined) {
          var birthdayArray = resp.birthday.split('/'),
              userBirthdayMonth = parseInt(birthdayArray[0]),
              userBirthdayDate = parseInt(birthdayArray[1]);

          if(userBirthdayMonth === currentMonth && userBirthdayDate === currentDate) {
            console.log("Happy birthday: " + resp.id);
            FB.api('/' + resp.id + '/feed', 'post', { message: "Happy Birthday :)" }, function(response) {
              if (!response || response.error) {
                console.log(response.error);
              }
            });
          }
        };

      });
    });

  }
});


