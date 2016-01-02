/**
* Login.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'MySQLServerMeta',
	attributes: {
		loginID: {
            type: 'integer',
            index: true,
            primaryKey: true,
            autoIncrement: true
        },

        dateTime: {
        	type: 'datetime',
            //very dirty I know, please replace. quickest solution i found
        	defaultsTo: new Date().toISOString().slice(0, 19).replace('T', ' ')
        },
        //define relationship with user
        userID: {
            model: 'User',
            required: true
        }
	},

    tableName: 'LoginRecord'
};

