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

    var params = waterlock._utils.allParams(req);
    var user = {
      username: params.username,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      role: params.role.id
    };
    var auth = {
      username: params.username,
      password: params.password
    };

    User.create(user).exec(function userCreated(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      waterlock.engine.attachAuthToUser(auth, user, function(err, ua) {
        if (err) {
          return res.negotiate(err);
        }
        User.findOne({id: user.id}).populate('role').exec(function rolePopulated(err, user) {
          if (err) {
            return res.negotiate(err);
          }
          res.json(user);
        });
      });
    });
  },

  update: function(req, res) {

    var params = waterlock._utils.allParams(req);
    // username can't be changed: not included
    var user = {
      id: params.id,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      role: params.role.id
    };

    User.update({id: user.id}, user).exec(function userUpdated(err, users) {
      if (err) {
        return res.negotiate(err);
      }
      if (!users[0]) {
        return res.badRequest('User doesn\'t exist.');
      }
      var user = users[0];

      // update password
      if (params.changePassword && params.password == params.passwordConfirm) {
        var auth = {
          username: user.username,
          password: params.password
        };

        waterlock.engine.attachAuthToUser(auth, user, function(err, ua) {
          if (err) {
            return res.negotiate(err);
          }
          console.log(auth.username + ": password changed");
        });
      }

      User.findOne({id: user.id}).populate('role').exec(function rolePopulated(err, user) {
        if (err) {
          return res.negotiate(err);
        }
        res.json(user);
      });
    });
  }
});