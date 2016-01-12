/**
* AcademicStaff_Section.js
*
* @description :: Associates Academic Staff to Sections they teach, and provides contextual information describing the relationship.
* @auth        :: A.A
*/

module.exports = {

	attributes: {
		academicStaffSectionID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		courseSectionID: {
			mode: 'Course_Section',
			required: true
		}, 
		role:{
			type: 'string',
			size: 50
		},
		weight:{
			type: 'float',
			required: true
		},
		staffID: {
			model: 'AcademicStaff',
			required: true
		} 
	},
	tableName: 'AcademicStaff_Section'
};
