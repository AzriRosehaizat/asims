module.exports = {

  connection: 'MySQLServerMeta',
  autoPK: true,
  tableName: 'ToDoList',

  attributes: {
    text: {
      type: 'string',
      required: true,
      unique: false
    },
    state: {
       type: 'boolean',
       defaultsTo: false,
       required: true,
    },
    userid: {
      model: 'User'
    }
  }
};