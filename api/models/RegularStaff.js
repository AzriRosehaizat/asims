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
			autoIncrement: true,
			primaryKey: true,
			index: true
		},
		tenureDate: {
			type: 'date'
		},
		contApptDate: {
			type: 'date'
		},
		academicStaffID: {
			model: 'AcademicStaff',
			required: true
		},
		startDate:{
			type: 'date',
			required: true 
		},
		endDate:{
			type: 'date'
		},
		Chair:{
			collection: 'Chair',
			via: 'regularStaffID'
		},
		FCECredit:{
			collection: 'FCECredit',
			via: 'regularStaffID'
		},
		FCEDebit:{
			collection: 'FCEDebit',
			via: 'regularStaffID'
		},
		LoadIncrease:{
			collection: 'LoadIncrease',
			via: 'regularStaffID'
		},
		LoadReduction:{
			collection: 'LoadReduction',
			via: 'regularStaffID'
		},
		RegularStaff_Research: {
			collection: 'RegularStaff_Research',
			via: 'regularStaffID'
		},
		StaffLeave: {
			collection: 'StaffLeave',
			via: 'regularStaffID'
		},
		LeaveCredit: {
			collection: 'LeaveCredit',
			via: 'regularStaffID'
		},
		LeaveDebit: {
			collection: 'leaveDebit',
			via: 'regularStaffID'
		}
	},
	tableName: 'RegularStaff'
};
