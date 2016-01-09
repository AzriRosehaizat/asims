module.exports = {

    // create: function(callback, auth, userObj) {
    //     //data validation
    //     if (!auth.username) {
    //         return callback(new Error('No username Provided'));
    //     }
    //     if (!auth.password) {
    //         return callback(new Error('No password Provided'));
    //     }
    //     //use sails create syntax and upon completion, call our callback (implictly passing in error and succes parameters)
    //     //User.create(data).exec(callback);
    //     User.create(userObj).exec(function userCreated(err, user) {
    //         if (err) return callback(new Error(err));
            
    //         waterlock.engine.attachAuthToUser(auth, user, function(err, ua) {
    //             if (err) return callback(new Error(err));
                
    //             //save the user object to database
    //             user.save(function(err, user) {
    //                 if (err) return callback(new Error(err));
                    
    //                 console.log("user creation success");
    //             });
    //         });
    //     }).exec(callback);
    // },

    // update: function(callback, userObj) {

    //     User.findOne((userObj.id), function foundUser(err, user) {
    //         if (err) return callback(new Error(err));
    //         if (!user) return callback(new Error('User doesn\'t exist.'));

    //         User.update(userObj.id, userObj.params.all(), function userUpdated(err, user) {
    //             if (err) return callback(new Error(err));
    //             console.log(user);
    //             return;
    //         });
    //     }).exec(callback);
    // },

};