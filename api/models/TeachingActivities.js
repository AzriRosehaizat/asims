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
		courseID: {
			model: 'Course',
			required: true
		},
		sectionID: {
			model: 'Section',
			required: true
		},
		term: {
			type: 'string',
			size: 45,
			required: true
		},
		year: {
			type: 'integer',
			required: true
		},
		startDate:{
			type: 'date',
			required: false 
		},
		endDate:{
			type: 'date',
			required: false
		},
		FCEValue: {
			type: 'float',
			required: true
		},
		role: {
			type: 'string',
			size: 30
		},
		Overload: {
			collection: 'Overload',
			via: 'teachingActivitiesID'
		},
		RightToRefusal: {
			collection: 'RightToRefusal',
			via: 'teachingActivitiesID'
		}
	},
	tableName: 'TeachingActivities'
};
