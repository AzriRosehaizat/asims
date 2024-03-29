/**
* ContractStaff.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes:{
		contractStaffID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		academicStaffID: {
			model: 'AcademicStaff',
			required: true
		},
		RightToRefusal: {
			collection: 'RightToRefusal',
			via: 'contractStaffID'
		}
	},
	tableName: 'ContractStaff'
};
