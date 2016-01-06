/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({

  create: function(request, response) {
    //pull relevant data from the request (could add validation here, but felt like it belonged in business logic)
    var auth = {
      username: request.param.username,
      password: request.param.password
    };
    var userObj = {
      username: request.param.username,
      email: request.param.email
    };

    //call the business logic for creating a new user 
    UserService.create(
      //pass a callback to be triggered upon completion 
      function(error, user) {
        //if there is an error creating the user throw an error (could probably be handled/client currently sees internal server error)
        if (error) {
          console.log(error);
        }
        //if there is no error, return the newly created object in the response
        else {
          response.json(user);
        }
      },
      // pass our created data to the create function 
      auth, userObj
    );
  },
  // //see above, no meaningful differences
  // authenticate: function(request, response) {
  //   var data = {
  //     "username": request.param('username'),
  //     "password": request.param('password'),
  //   };
  //   UserService.authenticate(function(error, data) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     else {
  //       response.json(data);
  //     }
  //   }, data);
  // }
});