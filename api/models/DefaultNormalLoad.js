/**
* DefaultNormalLoad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
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