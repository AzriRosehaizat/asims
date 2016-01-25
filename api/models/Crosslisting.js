/**
* Crosslisting.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		crosslistingID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		courseID: {
			model: 'Course',
			required: true
		},
		groupID: {
			type: 'integer',
			required: true
		}	
	},
	tableName: 'Crosslisting'
};
