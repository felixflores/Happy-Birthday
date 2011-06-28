FB.init({
  appId:    '243685762324575',
  cookie:   true,
  status:   true,
  xfbml:    true
});


// FB.getLoginStatus(function(response) {
//   if (response.session) { $('#login-button').hide(); }
// });

// FB.api('/me/friends', function(friends) {
//   if(friends !== null && friends !== undefined) {
//     var today = new Date(),
//         currentDate = today.getDate(),
//         currentMonth = today.getMonth() + 1;
// 
//     $.each(friends.data, function(index, friend) {
//       FB.api('/' + friend.id, function(resp) {
//         if(resp.birthday !== null && resp.birthday !== undefined) {
//           console.log(resp.birthday);
//       //     var birthdayArray = resp.birthday.split('/'),
//       //         userBirthdayMonth = parseInt(birthdayArray[0]),
//       //         userBirthdayDate = parseInt(birthdayArray[1]);
// 
//       //     if(userBirthdayMonth === currentMonth && userBirthdayDate === currentDate) {
//       //       console.log("Happy birthday: " + resp.id);
//       //       FB.api('/' + resp.id + '/feed', 'post', { message: "Happy Birthday :)" }, function(response) {
//       //         if (!response || response.error) {
//       //           console.log(response.error);
//       //         }
//       //       });
//       //     }
//         };
//       });
// 
//     });
// 
//   }
// });
// 

