/**
* ResearchGrant.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		grantID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},	
		researchID: {
			model: 'Research',
			required: true
		},
		grantingAgency: {
			type: 'string'
		},
		dateAwarded: {
			type: 'date'
		},
		duration: {
			type: 'float'
		},
		amount: {
			type: 'float'
		}
	},
	tableName: 'ResearchGrant'
};
