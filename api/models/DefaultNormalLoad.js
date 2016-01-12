/**
* DefaultNormalLoad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	defaultNormalLoadID: {
		type: 'integer',
		primaryKey: true,
		autoIncrement: true,
		index: true
	}, 	
  	rankID: {
		model: 'Rank',
		required: true
	},
	departmentID: {
		model: 'Department',
		required: true
	}, 
	startDate: {
		type: 'date',
		required: true
	},
	FCEValue: {
		type: 'float',
		required: true
	}
  },
  tableName: 'DefaultNormalLoad'
};