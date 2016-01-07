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

  create: function(req, res) {

    //pull relevant data from the request (could add validation here, but felt like it belonged in business logic)
    var params = waterlock._utils.allParams(req);
    var auth = {
      username: params.username,
      password: params.password
    };
    delete(params.password);

    User.create(params).exec(function userCreated(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      waterlock.engine.attachAuthToUser(auth, user, function(err, ua) {
        if (err) {
          return res.negotiate(err);
        }
        else {
          waterlock.cycle.loginSuccess(req, res, ua);
        }
      });
    });

    // UserService.create(
    //   //pass a callback to be triggered upon completion 
    //   function(err, user) {
    //     //if there is an error creating the user throw an error (could probably be handled/client currently sees internal server error)
    //     if (err) {
    //       res.negotiate(err);
    //     }
    //     //if there is no error, return the newly created object in the response
    //     else {
    //       res.json(user);
    //     }
    //   },
    //   // pass our created data to the create function 
    //   auth, userObj
    // );
  },

  update: function(req, res) {

    var params = waterlock._utils.allParams(req);
    delete(params.username); // username can't be changed

    User.findOne({id: params.id}).exec(function foundUser(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        return res.badRequest('User doesn\'t exist.')
      }

      User.update({id: params.id}, params).exec(function userUpdated(err, user) {
        if (err) {
          return res.negotiate(err);
        }
        res.json(user);
      });
    });

    // UserService.update(
    //   //pass a callback to be triggered upon completion 
    //   function(err, user) {
    //     if (err) {
    //       res.negotiate(err);
    //     }
    //     else {
    //       res.json(user);
    //     }
    //   },
    //   userObj
    // );
  },

});