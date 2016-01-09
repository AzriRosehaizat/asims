/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  connection: 'MySQLServerMeta',
  tableName: 'User',
  autoPK: true,

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
    
    // role: {
    //   type: 'string',
    //   enum: ['reader', 'writer', 'admin']
    // },

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
