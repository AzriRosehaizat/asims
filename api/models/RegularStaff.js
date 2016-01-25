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
		academicStaffID: {
			model: 'AcademicStaff',
			required: true
		},
		tenureDate: {
			type: 'date'
		},
		contApptDate: {
			type: 'date'
		},
		RegularStaffEmployment: {
			collection: 'RegularStaffEmployment',
			via: 'regularStaffID'
		},
		Chair:{
			collection: 'Chair',
			via: 'regularStaffID'
		},
		RegularStaff_Rank: {
			collection: 'RegularStaff_Rank',
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
			collection: 'LeaveDebit',
			via: 'regularStaffID'
		}
	},
	tableName: 'RegularStaff'
};
