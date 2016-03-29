//DAL Module

module.exports = function (dal){
    "use strict";

    return {
        log: function (level, message) {

            //DAL.db.insert(level, message, new Date());
        },

        login: function (email, password, callback) {
            dal._exec("usr_login", [email, password], function(res){
                //Parse result here
                console.log(res);
                var rdp = res[0][0];
                callback(rdp);
            });
        },
        validateUser : function(name, callback){
            dal._exec("usr_valid", [name], callback);
        },
        validateEmail: function (email, callback) {
            dal._exec("email_valid", [email], callback);
        },
        get: function(id, callback){
            dal._exec('usr_get', [id], function(res){
                var rdp = res[0][0];
                callback(rdp);
            });
        }
    }
}