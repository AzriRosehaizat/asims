/**
 * Attempt
 *
 * @module      :: Model
 * @description :: Tracks login attempts of users on your app.
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {
  
	connection: 'MySQLServerMeta',
	autoPK: true,
	autoCreatedAt: true,
	migrate: 'alter',
	tableName: 'Attempt',
	
	attributes: require('waterlock').models.attempt.attributes({

	/* e.g.
	nickname: 'string'
	*/

	})
};