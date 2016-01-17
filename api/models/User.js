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
  
  attributes: require('waterlock').models.user.attributes({

    username: {
      type: 'string',
      required: true,
      unique: true
    },
    
    email: {
      type: 'email',
      unique: true
    },
    
    role: {
      model: 'Role'
    },

    toJSON: function() {
      var obj = this.toObject();
      if (typeof obj.auth === 'object' && obj.auth.password) {
        delete obj.auth.password;
      }
      return obj;
    }

  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
