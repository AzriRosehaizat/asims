/**
* AcademicStaff.js
*
* @description :: Contains information pertaining to both Regular Academic Staff, and Contract Academic Staff.
* @author      :: A.A.
*/

module.exports = {

	attributes: {
		staffID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		firstName: {
			type: 'string',
			size: 50,
			required: true
		},
		lastName: {
			type: 'string',
			size: 50,
			required: true
		}
	},
	tableName: 'AcademicStaff'
};