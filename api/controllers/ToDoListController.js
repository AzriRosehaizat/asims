/**
 * ToDoListController
 *
 * @description :: Server-side logic for managing To-do List
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    deleteCompleted: function(req, res) {

        var list = req.param('list');
        var ids = [];

        _.forEach(list, function(item) {
            if (item.state) ids.push(item.id);
        });

        ToDoList.destroy({id: ids}).exec(function(err) {
            if (err) {
                return res.negotiate(err);
            }
            res.ok();
        });
    }
};
