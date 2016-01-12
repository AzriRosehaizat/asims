/**
* LeaveDebit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
		leaveDebitID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		regularStaffID: {
			model: 'RegularStaff',
			required: true
		},
		amount: {
			type: 'float',
			required: true
		},
		description: {
			type: 'text'
		},
		dateIssued: {
			type: 'date'
		},
		leaveDebitType: {
			type: 'String',
			size: 50
		},
		//Identifies leaves 1:M
		StaffLeave:{
			collection: 'StaffLeave',
			via: 'leaveDebitID'
		}
	},
	tableName: 'LeaveDebit'
};
