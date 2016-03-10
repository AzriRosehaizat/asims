var mysql = require('knex')({
	client: 'mysql'
});

module.exports = {
    getLeave: function (callback){
        var sSQL = mysql.select('l.*')
            .from('CountLeave as l');
            
            sSQL = sSQL.toString();
            Home.query(sSQL, callback);
    },
    getResearch: function (callback){
        var sSQL = mysql.select('re.*')
            .from('CountResearch as re');
            
            sSQL = sSQL.toString();
            Home.query(sSQL, callback);
    },
    getRegularStaff: function(callback){
        var sSQL = mysql.select('r.*')
            .from('CountEmployment_Regular as r');
            
            sSQL = sSQL.toString();
            Home.query(sSQL, callback);
    },
    getContractStaff: function(callback){
        var sSQL = mysql.select('c.*')
            .from('CountEmployment_Contract as c');
            
            sSQL = sSQL.toString();
            Home.query(sSQL, callback);
    }
};