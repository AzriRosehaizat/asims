/**
 * ContractStaff_Rank.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		contractStaffRankID: {
			type: 'integer',
			autoIncrement: true,
			primaryKey: true,
			index: true
		},
		rankID: {
			model: 'Rank',
			required: true
		},
		contractStaffID: {
			model: 'ContractStaff',
			required: true
		},
		startDate: {
			type: 'date',
			required: true
		},
		endDate: {
			type: 'date'
		}
	},
	tableName: 'ContractStaff_Rank'
};

