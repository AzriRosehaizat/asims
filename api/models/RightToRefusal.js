/**
* RightToRefusal.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		rightToRefusalID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		sectionOfferedID: {
			model: 'Section_Offered',
			required: 'true'
		},
		contractStaffID: {
			model: 'ContractStaff',
			required: 'true'
		},
		startTerm: {
			type: 'string',
			required: true,
			size: 10
		},
		endTerm: {
			type: 'string',
			required: true,
			size: 10
		}
	},
	tableName: 'RightToRefusal'
};

