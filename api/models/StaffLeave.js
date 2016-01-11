/**
* StaffLeave.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		leaveID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		regularStaffID: {
			model: 'RegularStaff',
			required: true
		},
		leaveDebitID: {
			model: 'LeaveDebit',
			required: true
		},
		description: {
			type: 'text'
		},
		startDate: {
			type: 'date',
			required: true
		},
		endDate: {
			type: 'date',
			required: true
		},
		leavePercentage: {
			type: 'float'
		},
		wagePercentage: {
			type: 'float'
		}

	},
	tableName: 'StaffLeave'
};

