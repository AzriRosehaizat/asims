module.exports = {

	attributes: {
  		departmentID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		facultyID: {
			model: 'Faculty',
			required: true
		},
		departmentCode: {
			type: 'string',
			required: true
		},
		title:{
			type: 'string',
			size: 50,
			required: true
		},
		description: {
			type: 'text',
		}

	},
	tableName: 'Department'
};