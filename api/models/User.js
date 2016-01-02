/**
* User Model - not much to see here
**/
module.exports = {
    connection: 'MySQLServerMeta',
    attributes: {
        userID: {
            type: 'integer',
            index: true,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },

        //Add reference to Permissions (FK)
        permissionID: {
            model: 'Permission',
            required: false
        },

        //add referece to LoginRecord 1:m
        logins:{
            collection: 'LoginRecord',
            via: 'userID'
        },

        //K this attribute has to be last. it will cause problem otherwise
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }

    },

    tableName:'User'
};