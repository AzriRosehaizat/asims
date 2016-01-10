/**
* Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	courseID: {
		type: 'integer',
		primaryKey: true,
		autoIncrement: true,
		index: true
	},
	title: {
		type: 'string',
		size: 100
		required: true
	},
	description: {
		type: 'text'
	},
	
	belongsToDepartment: {
		collection: 'Department_Course'
		via: 'courseID'
	}
  },
  tableName: 'Course'
};
