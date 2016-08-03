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
		teachingActivitiesID: {
			model: 'TeachingActivities',
			required: 'true'
		},
		contractStaffID: {
			model: 'ContractStaff',
			required: 'true'
		},
		term: {
			type: 'string',
			size: 45
		},
		year: {
			type: 'string'
		}
	},
	tableName: 'RightToRefusal'
};

