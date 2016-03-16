/**
 * FCE.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        FCEID: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true,
            index: true
        },
        regularStaffID: {
            model: 'RegularStaff',
            required: true
        },
        FCEValue: {
            type: 'float',
            required: true
        },
        FCEType: {
            type: 'string',
            required: true
        },
        description: {
            type: 'text'
        },
        dateIssued: {
            type: 'date'
        }
    },
    tableName: 'FCE'
};
