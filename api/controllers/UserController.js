module.exports = {
    // create user function
    create: function( request, response){
    	//pull relevant data from the request (could add validation here, but felt like it belonged in business logic)
    	var data = {
    		"username"	: request.param('username') ,
    		"password"	: request.param('password'),
  	    };
  	    //call the business logic for creating a new user 
    	UserService.create( 
    	    //pass a callback to be triggered upon completion 
    	    function( error, data ){
        	    //if there is an error creating the user throw an error (could probably be handled/client currently sees internal server error)
        		if ( error ){
        			throw error;
        		}
        		// if there is no error, return the newly created object in the response
        		else {
        			response.json( data );
        		}
        	},
        	// pass our created data to the create function 
        	data 
    	);
    },
    //see above, no meaningful differences
    authenticate: function( request, response){
    	var data = {
    		"username"	: request.param('username') ,
    		"password"	: request.param('password'),
  	    };
    	UserService.authenticate( function( error, data ){
    		if ( error ){
    			throw error;
    		} else {
    			response.json( data );
    		}
    	}, data );
    }
};