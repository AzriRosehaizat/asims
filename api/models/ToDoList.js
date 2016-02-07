module.exports = {

  connection: 'MySQLServerMeta',
  autoPK: true,
  tableName: 'ToDoList',

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: false
    },
    state: {
       type: 'boolean',
       required: true,
    },
    userid: {
      model: 'User'
    }
  }
};