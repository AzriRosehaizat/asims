/**
* Rank.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		rankID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		title: {
			type: 'string',
			size: 50,
			required: true
		},
		description: {
			type: 'text'
		},
		identifiesDefaultNormalLoad:{
			collection: 'DefaultNormalLoad',
			via: 'rankID'
		},
		identifiesStaffRank:{
			collection: 'RegularStaff_Rank',
			via: 'rankID'
		}
	},
	tableName: 'Rank'
};
