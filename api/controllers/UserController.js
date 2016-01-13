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
  },

  update: function(req, res) {

    var params = waterlock._utils.allParams(req);
    var userObj = {
      id: params.id,
      email: params.email,
      role: params.role.id
    };

    User.update({id: userObj.id}, userObj).exec(function userUpdated(err, users) {
      if (err) {
        return res.negotiate(err);
      }
      if (!users[0]) {
        return res.badRequest('User doesn\'t exist.');
      }
      
      res.json(users[0]);
    });
  },

});