module.exports = {
    //create user function
    create: function(callback, auth, userObj) {
        //data validation
        if (!auth.username) {
            callback(new Error('No username Provided'));
            return;
        }
        if (!auth.password) {
            callback(new Error('No password Provided'));
            return;
        }
        //use sails create syntax and upon completion, call our callback (implictly passing in error and succes parameters)
        //User.create(data).exec(callback);
        User.create(userObj).exec(function userCreated(error, user) {
            if (error) {
                callback(new Error(error));
                return;
            }
            waterlock.engine.attachAuthToUser(auth, user, function(error, ua) {
                if (error) {
                    callback(new Error(error));
                    return;
                }
                //save the user object to database
                user.save(function(error, user) {
                    if (error) {
                        callback(new Error(error));
                        return;
                    }
                    console.log("user login success");
                });
            });
        }).exec(callback);
    },
    // //see above, no meaningful differences
    // authenticate: function(callback, data) {
    //     if (!data.username) {
    //         callback(new Error('No username Provided'));
    //         return;
    //     }
    //     if (!data.password) {
    //         callback(new Error('No password Provided'));
    //         return;
    //     }

    //     User.findOne(data).exec(callback);
    // }
};