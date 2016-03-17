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
	departmentID: {
		model: 'Department',
		required: true
	},
	courseNo: {
		type: 'string',
		required: true,
		unique: true
	},
	title: {
		type: 'string',
		size: 50
	},
	description: {
		type: 'text'
	},
	TeachingActivities: {
		collection: 'TeachingActivities',
		via: 'courseID'
	}
  },
  tableName: 'Course'
};
