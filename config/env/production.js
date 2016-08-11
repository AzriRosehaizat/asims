/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  connections: {
    MySQLServer: {
      adapter: 'sails-mysql',
      host: process.env.ASIMS_IP,
      user: process.env.ASIMS_USER,
      password: process.env.ASIMS_PW,
      database: 'asims',
      timezone: 'America/Winnipeg'
    },
    
    MySQLServerMeta: {
      adapter: 'sails-mysql',
      host: process.env.ASIMS_IP,
      user: process.env.ASIMS_USER,
      password: process.env.ASIMS_PW,
      database: 'asimsMeta',
      timezone: 'America/Winnipeg'
    }
  },
    
  models: {
     connection: 'MySQLServer',
     schema: true,
     autoPK: false,
     autoCreatedAt: false,
     autoUpdatedAt: false,
     migrate: 'safe'
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

  hookTimeout: 500000

};
