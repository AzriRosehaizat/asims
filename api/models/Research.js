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
		title: {
			type: 'string',
			size: 50,
			required: true
		},
		abstract: {
			type: 'text'
		},
		startDate:{
			type: 'date' 
		},
		endDate:{
			type: 'date'
		},
		RegularStaff_Research:{
			collection: 'RegularStaff_Research',
			via: 'researchID'
		},
		ResearchGrant:{
			collection: 'ResearchGrant',
			via: 'researchID'
		}
	},
	tableName: 'Research'
};
