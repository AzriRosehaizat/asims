/**
* Section.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		sectionID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		sectionNo: {
			type: 'string',
			size: 10,
			unique: true
		},
		sectionType: {
			type: 'string',
			size: 50
		},
		TeachingActivities: {
			collection: 'TeachingActivities',
			via: 'sectionID'
		}
	},
	tableName: 'Section'
};