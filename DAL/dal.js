"use strict";
var DAL = {
	    _exec: function (query, values, callback) {
	        console.log("[DAL] exec : " + query);

	        F.database(function (error, cnx) {

	            if (error) {
	                cnx.release();
	                console.log('[DAL] : ' + error);
	                callback(error);
	                return;
	            }
	            //https://www.npmjs.com/package/mysql#escaping-query-values
	            //e.g. | ? :auto escaping

	            //  var userId = 1;
	            //  var columns = ['username', 'email'];
	            //  var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function(err, results) {
	            //      ... 
	            //  });

	            var sp = "CALL " + query + "(?);";
	            
	            console.log("[DAL] Query: " + sp + ' | ' + values);

	            cnx.query(sp, [values], function (err, rows) {

	                // Close connection
	                cnx.release();

	                if (err) {
	                    console.log('[DAL] : ' + err);
	                    callback({
	                        error: err
	                    });
	                }

	                // Shows the result on a console window
	                //                console.log(rows[0][0]);

	                // Send rows as the model into the view
	                callback(rows);
	            });

	        });
	    }
	}

DAL.user = require('./user.js')(DAL);

module.exports = DAL;