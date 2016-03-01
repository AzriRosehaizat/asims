/**
 * Section_OfferedController
 *
 * @description :: Server-side logic for managing Course_sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    search: function(req, res) {

        var where = JSON.parse(req.param("where"));

        Section.find({
            sectionNo: {
                'startsWith': where.sectionNo.startsWith
            }
        }).exec(function(err, sections) {
            if (err) {
                return res.negotiate(err);
            }

            var sectionIDs = [];
            _.forEach(sections, function(section) {
                sectionIDs.push(section.sectionID);
            });

            Section_Offered.find({
                courseID: where.courseID,
                sectionID: sectionIDs
            }).populate('sectionID').exec(function(err, section_offered) {
                if (err) {
                    return res.negotiate(err);
                }

                _.forEach(section_offered, function(value) {
                    value.sectionNo = value.sectionID.sectionNo;
                    value.sectionID = value.sectionID.sectionID;
                });

                res.json(section_offered);
            });
        });
    },

    getSectionOffered: function(req, res) {
        var sectionOfferedID = req.param('sectionOfferedID');
        Section_OfferedService.getSectionOffered(sectionOfferedID, function(err, result) {
            if (err) return res.serverError(err);
            return res.ok(result);
        });
    }
};
