F.onAuthorize = function (req, res, flags, callback) {

    var cookie = req.cookie(F.config.cookie);
    if (cookie === null || cookie.length < 10) {
        console.log('F.onAuthorize / no cookie');
        callback(false);
        return;
    }

    var obj = F.decrypt(cookie, 'user');

    if (obj === null || obj === '' || obj.ip !== req.ip) {
        console.log('F.onAuthorize / user null');
        callback(false);
        return;
    }

    var user = F.cache.read('user_' + obj.id);
    if (!user)
        F.cache.set('user_' + obj.id, obj, '5 minutes');

    if (user)
        console.log('got user from cache.');

    req.user = user = obj;
    callback(true);

};


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