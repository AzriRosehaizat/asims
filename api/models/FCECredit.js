/**
* FCECredit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		FCECreditID: {
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
		FCECreditType: {
			type: 'String',
			size: 50
		}
	},
	tableName: 'FCECredit'
};