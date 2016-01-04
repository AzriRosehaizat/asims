/**
 * Use
 *
 * @module      :: Model
 * @description :: Tracks the usage of a given Jwt
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {
  
  connection: 'MySQLServerMeta',

  attributes: require('waterlock').models.use.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  })
};
