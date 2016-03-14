//DAL Module

module.exports = {


    log: function log(level, message) {

        //DAL.db.insert(level, message, new Date());
    },

    login: function login(email, password, callback) {
        this._exec("usr_login", [email, password], callback);

    },

    validateEmail: function validateEmail(email, callback) {
        this._exec("email_valid", [email], callback);
    },

    _exec: function (query, values, callback) {
        console.log("exec : " + query);

        F.DAL.pool.getConnection(function (error, cnx) {

            if (error) {
                cnx.release();
                console.log(error);
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

            var sp = "call " + query + "(?);";

            console.log("Query: " + sp + ' | ' + values);

            cnx.query(sp, [values], function (err, rows) {

                // Close connection
                cnx.release();

                if (err) {
                    console.log(err);
                    callback({
                        error: err
                    });
                }

                // Shows the result on a console window
                //                console.log(rows[0][0]);

                // Send rows as the model into the view
                callback(rows[0][0]);
            });

        });
    }
}