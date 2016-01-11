/**
* RegularStaff.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		regularStaffID: {
			model: 'AcademicStaff',
			required: true
		},
		tenureDate: {
			type: 'date'
		},
		hasFCECredit:{
			collection: 'FCECredit',
			via: 'regularStaffID'
		},
		hasFCEDebit:{
			collection: 'FCEDebit',
			via: 'regularStaffID'
		},
		hasLoadIncrease:{
			collection: 'LoadIncrease',
			via: 'regularStaffID'
		},
		hasLoadReduction:{
			collection: 'LoadReduction',
			via: 'regularStaffID'
		},
		doResearch: {
			collection: 'RegularStaff_Research',
			via: 'regularStaffID'
		}
	},
	tableName: 'RegularStaff'
};
