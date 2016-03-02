/**
 * Overload.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		overloadID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		teachingActivitiesID: {
			model: 'TeachingActivities',
			required: true
		},
		FCEValue: {
			type: 'float',
			required: false
		},
		amount: {
			type: 'float',
			size: '10,2',
			required: false
		},
	},
	tableName: 'Overload'
};