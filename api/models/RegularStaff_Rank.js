/**
* RegularStaff_Rank.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		regularStaffRankID: {
			type: 'integer',
			autoIncrement: true,
			primaryKey: true,
			index: true
		},
		rankID: {
			model: 'Rank',
			required: true
		},
		regularStaffID: {
			model: 'RegularStaff',
			required: true
		},
		startDate: {
			type: 'date'
		},
		endDate: {
			type: 'date'
		}
	},
	tableName: 'RegularStaff_Rank'
};
