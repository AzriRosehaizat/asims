var mysql = require('knex')({
	client: 'mysql'
});

module.exports = {
    getLeave: function (date, callback){
        var sSQL = mysql.count('staffLeaveID as NoStaffLeaves')
            .from('StaffLeave')
            .where('endDate', '>', date)
            .groupBy('staffLeaveID');
            
            sSQL = sSQL.toString();
            Home.query(sSQL, callback);
    },
    getRegularStaff: function(callback){
        var sSQL = mysql.select('r.regularStaffID')
            .from('RegularStaff as r');
            
            sSQL = sSQL.toString();
            Home.query(sSQL, callback);
    }
};