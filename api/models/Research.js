/**
* Research.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		researchID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		tenureDate: {
			type: 'date'
		},
		researchee:{
			collection: 'RegularStaff_Research',
			via: 'researchID'
		},
		hasGrant:{
			collection: 'ResearchGrant',
			via: 'researchID'
		}
	},
	tableName: 'Research'
};