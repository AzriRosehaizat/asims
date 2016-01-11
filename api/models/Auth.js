/**
 * Auth
 *
 * @module      :: Model
 * @description :: Holds all authentication methods for a User
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {
  
  connection: 'MySQLServerMeta',
  autoPK: true,
  migrate: 'alter',
  tableName: 'Auth',
  attributes: require('waterlock').models.auth.attributes({
    
    username: 'string',
    
    password: {
      minLength: 6
    },
    
  }),
  
  beforeCreate: require('waterlock').models.auth.beforeCreate,
  beforeUpdate: require('waterlock').models.auth.beforeUpdate
};
