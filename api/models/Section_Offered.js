/**
* Section_Offered.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		sectionOfferedID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		courseID: {
			model: 'Course',
			required: true
		},
		sectionID: {
			model: 'Section',
			required: true
		},
		groupID: {
			type: 'integer',
			required: true
		},
		startDate:{
			type: 'date',
			required: true 
		},
		endDate:{
			type: 'date',
			required: true 

		},
		AcademicStaff_Section: {
			collection: 'AcademicStaff_Section',
			via: 'sectionOfferedID'
		},
		RightToRefusal: {
			collection: 'RightToRefusal',
			via: 'sectionOfferedID'
		}
	},
	tableName: 'Section_Offered'

};

