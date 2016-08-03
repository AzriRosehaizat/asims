/**
* Faculty.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		facultyID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		title: {
			type: 'string',
			size: 50,
			required: true
		},
		//has many Department 1:M
		Department:{
			collection: 'Department',
			via: 'facultyID'
		}
	},
	tableName: 'Faculty'
};
