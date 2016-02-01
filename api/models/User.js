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
    
    if (id && id.length) {
      Auth.destroy({user: id}).exec(function(e, r) {
        Attempt.destroy({user: id}).exec(function(e, r) {
          Jwt.destroy({owner: id}).exec(cb);
        });
      });
    }
    else {
      cb();
    }
  }
};
