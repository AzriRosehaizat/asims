module.exports = {
    //create user function
    create: function( callback, data ){
        //data validation
        if ( !data.username ) {
            callback( new Error('No username Provided') );
            return;
        } 
        if ( !data.password ) {
            callback( new Error('No password Provided') );
            return;
        }
        //use sails create syntax and upon completion, call our callback (implictly passing in error and succes parameters)
        User.create( data ).exec( callback );   
    },
    //see above, no meaningful differences
    authenticate: function( callback, data ){
        if ( !data.username ) {
            callback( new Error('No username Provided') );
            return;
        } 
        if ( !data.password ) {
            callback( new Error('No password Provided') );
            return;
        }
        
        User.findOne( data ).exec( callback );   
    }
};