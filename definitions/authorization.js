
//Authorization
F.onAuthorize = function (req, res, flags, callback) {

    var cookie = req.cookie(F.config.cookie);
    if (cookie === null || cookie.length < 10) {
        console.log('F.onAuthorize / no cookie');
        callback(false);
        return;
    }

    var obj = F.decrypt(cookie, 'user');

    if (!obj || obj.ip !== req.ip) {
        console.log('F.onAuthorize / no user in cookie');
        callback(false);
        return;
    }

    var user = F.cache.read('user_' + obj.id);
    if (user){
        console.log('F.onAuthorize / got user from cache.');
        callback(true, user)
    }
    else {

        //Get user from DB
        F.DAL.user.get(obj.id, function(res){

            if(!res){
                callback(false);
                return;
            }
            user = res;
            console.log("F.onAuthorize / got user from DB");

            F.cache.set('user_' + user.id, user, '5 minutes');
            callback(true, user);
        });
    }
};
/*
F.on('module#auth', function(type, name) {
    var auth = MODULE('auth');
    auth.onAuthorize = function(id, callback, flags) {

        // - this function is cached
        // - here you must read user information from a database
        // - insert the user object into the callback (this object will be saved to session/cache)
        callback({ id: '1', alias: 'Peter Sirka' });

        // if user not exist then
        // callback(null);
    };
});*/

//Validation

F.onValidate = function (name, value) {
    switch (name) {
    case 'email':
        return U.isEmail(value);
    case 'emailv':
        F.DAL.validateEmail(value, function (res) {
            return res;
        });
    case 'password':
        return value.length > 0;
    case 'passwordconfirm':
        return value[0] === value[1];
    };
}