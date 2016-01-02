/**
* Permission.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'MySQLServerMeta',
	attributes: {
		permissionID: {
            type: 'integer',
            index: true,
            primaryKey: true,
            autoIncrement: true
        },

        role: {
        	type: 'string',
        	required: true
        },

        //Add a reference to user; A role can be attached to many users
       	user: {
       		collection: 'User',
       		via: 'permissionID'
       	}
	},
tableName:'Permission'
};

