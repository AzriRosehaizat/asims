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
		courseID: {
			model: 'Course',
			requireD: true
		},
		identifier: {
			type: 'string',
			size: 20,
			required: true
		},
		startTerm: {
			type: 'string',
			size: 25,
			required: true
		},
		endTerm: {
			type: 'string',
			size: 25,
			required: true
		},
		FCEValue: {
			type: 'float',
			required: true
		}
	},
	tableName: 'Section'
};