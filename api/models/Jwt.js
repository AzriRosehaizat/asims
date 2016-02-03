/**
 * Jwt
 *
 * @module      :: Model
 * @description :: Holds all distributed json web tokens
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {
  
  connection: 'MySQLServerMeta',
  autoPK: true,
  tableName: 'Jwt',
  
  attributes: require('waterlock').models.jwt.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  }),
  
  afterDestroy: function(destroyedToken, cb) {
    Use.destroy({jsonWebToken: _.pluck(destroyedToken, 'id')}).exec(cb);
  }
};
