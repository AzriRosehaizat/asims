/**
* Course_Section.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		courseSectionID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		departmentCourseID: {
			model: 'Department_Course',
			required: true
		},
		sectionID: {
			model: 'Section',
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
		FCEValue: {
			type: 'float',
			required: true
		}
	}

};
