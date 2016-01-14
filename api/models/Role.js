/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  connection: 'MySQLServerMeta',
  autoPK: true,
  migrate: 'alter',
  tableName: 'Role',

  attributes: {
    role: 'string',

    users: {
      collection: 'User',
      via: 'role'
    }
  }
};
