/**
* TeachingActivities.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		teachingActivitiesID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},

		academicStaffID: {
			model: 'AcademicStaff',
			required: true
		},

		sectionOfferedID: {
			mode: 'Section_Offered',
			required: true
		}, 
		role:{
			type: 'string',
			size: 50
		},

		startDate: {
			type: 'date',
			required: true
		},
		endDate: {
			type: 'date',
			required: true
		}
	}
};

