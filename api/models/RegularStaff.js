/**
* RegularStaff.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		regularStaffID: {
			type: 'integer',
			required: true,
			primaryKey: true
		},
		tenureDate: {
			type: 'date'
		},
		hasChair:{
			collection: 'Chair',
			via: 'regularStaffID'
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
		},
		hasLeave: {
			collection: 'StaffLeave',
			via: 'regularStaffID'
		},
		hasLeaveCredit: {
			collection: 'StaffLeave',
			via: 'regularStaffID'
		},
		hasLeaveDebit: {
			collection: 'StaffLeave',
			via: 'regularStaffID'
		}
	},
	tableName: 'RegularStaff'
};
