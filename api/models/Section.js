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
		type: {
			type: 'string',
			size: 50
		},
		FCEModifier: {
			type: 'float'
		},
		Section_Offered: {
			collection: 'Section_Offered',
			via: 'sectionID'
		}
	},
	tableName: 'Section'
};