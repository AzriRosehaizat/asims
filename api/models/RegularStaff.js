module.exports = {

	attributes: {
		regularStaffID: {
			type: 'integer',
			autoIncrement: true,
			primaryKey: true,
			index: true
		},
		academicStaffID: {
			model: 'AcademicStaff',
			required: true
		},
		tenureDate: {
			type: 'date'
		},
		contApptDate: {
			type: 'date'
		}
	},
	tableName: 'RegularStaff'
};
