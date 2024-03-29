/**
* LoadIncrease.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
	attributes: {
		loadIncreaseID: {
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
		description: {
			type: 'text'
		},
		year: {
			type: 'string',
			required: true
		},
		dateIssued: {
			type: 'date'
		}
	},
	tableName: 'LoadIncrease'
};
