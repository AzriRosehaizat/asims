/**
* LoadReduction.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
	attributes: {
		loadReductionId: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		regularStaffID: {
			model: 'RegularStaff',
			required: true
		},
		FCEValue: {
			type: 'float',
			required: true
		},
		startDate: {
			type: 'date',
			required: true
		},
		endDate: {
			type: 'date',
			required: true
		}
	},
	tableName: 'LoadReductionReg'
};
