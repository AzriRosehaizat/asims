module.exports = {

	attributes: {
		academicStaffDepartmentID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		academicStaffID: {
			model: 'AcademicStaff',
			required: true
		},
		departmentID: {
			model: 'Department',
			required: true
		},
		startDate:{
			type: 'date',
			required: true
		},
		endDate:{
			type: 'date'
		},
		isPrimaryDepartment: {
			type: 'boolean',
			//Make it primary department by default
			//ToDO create lifecycle callback for checking new additions.
			defaultsTo: 1
		}
	},
  	tableName: 'AcademicStaff_Department'
};
