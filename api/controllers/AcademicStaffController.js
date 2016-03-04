module.exports = {

    searchFullName: function(req, res) {

        var type = req.param('type');
        var where = JSON.parse(req.param('where'));
        var names = where.fullName.startsWith.split(' ');

        var query = {
            firstName: {
                'startsWith': names[0]
            }
        };
        if (names[1]) {
            query.lastName = {
                'startsWith': names[1]
            };
        }

        AcademicStaff.find(query).populate(type).exec(function(err, staffs) {
            if (err) {
                return res.negotiate(err);
            }
            
            if (type === 'RegularStaff') {
                staffs = _.filter(staffs, function(staff) {
                    staff.fullName = staff.firstName + ' ' + staff.lastName;
                    return !_.isEmpty(staff.RegularStaff)
                });
            }
            else if (type === 'ContractStaff') {
                staffs = _.filter(staffs, function(staff) {
                    staff.fullName = staff.firstName + ' ' + staff.lastName;
                    return _.isEmpty(staff.RegularStaff) && !_.isEmpty(staff.ContractStaff)
                });
            }

            res.json(staffs);
        });
    }
};
