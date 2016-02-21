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
			model: 'Section_Offered',
			required: true
		},
		FCEValue: {
			type: 'float',
			required: true
		},
		role: {
			type: 'string',
			size: 30
		}
	}
};
