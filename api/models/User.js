/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  connection: 'MySQLServerMeta',

  attributes: require('waterlock').models.user.attributes({

    // username: {
    //   type: 'string',
    //   required: true,
    //   unique: true
    // },

    // email: {
    //   type: 'email',
    //   required: true,
    //   unique: true
    // },

    // jsonWebTokens: {
    //   collection: 'jwt',
    //   via: 'owner'
    // },

    username: 'string',
    email: 'string',

  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
