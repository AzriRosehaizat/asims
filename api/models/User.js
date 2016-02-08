/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  connection: 'MySQLServerMeta',
  autoPK: true,
  tableName: 'User',
  migrate: 'alter',
  
  attributes: require('waterlock').models.user.attributes({

    username: {
      type: 'string',
      required: true,
      unique: true
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    role: {
      model: 'Role'
    },
    toJSON: function() {
      var obj = this.toObject();
      if (typeof obj.auth === 'object' && obj.auth && obj.auth.password) {
          delete obj.auth.password;
      }
      return obj;
    }
  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate,
  
  afterDestroy: function(destroyedUser, cb) {
    var id = _.pluck(destroyedUser, 'id');
    
    Auth.destroy({user: id}).exec(function authDeleted(err, auth) {
        
      Attempt.findOne({user: id}).exec(function foundAttempt(err, attempt) {
        if (!attempt) {
          return cb();
        }
        Attempt.destroy({user: id}).exec(function attemptDeleted(err, attempts) {
            
          Jwt.destroy({owner: id}).exec(cb);
        });
      });
    });
  }
};
