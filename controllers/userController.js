exports.install = function () {

    //    F.route('/', view_profile, ['authorize'])
    F.route('/', json_login, ['xhr', 'post']);
    F.route('/register', view_register);
    F.route('/register', post_register, ['post']);

    F.route('/logout', json_logoff, ['authorize']);
    //    F.route('/', view_authorize, ['authorize']);
    //    F.route('/checkmail')
};

// User profile
// GET, [logged]
function view_profile() {
    var self = this;
    self.json(self.user);

    // in a view @{user.alias}
}

function view_register() {
    this.view('register');
}

function post_register() {
    
    
}
// Framework usage
// GET
//function view_usage() {
//    var self = this;
//    self.plain(framework.usage(true));
//}

// Login process
// POST, [xhr, unlogged]
function json_login() {
    var self = this;
    var error = self.validate(self.post, ['email', 'password']);

    if (self.user !== null) {
        error.add('Logged');
        self.json(error);
        return;
    }

    F.DAL.login(self.body.email, self.body.password, function (res) {

        console.log('Login : ' + res);

        if (!res) {
            error.add('LoginError');
        } else if (res.error) {
            error.add(res.error);
        }

        if (error.hasError()) {
            self.json(error);
            return;
        }
        var user = res;
        //        console.log(user);
        // Save to cookie
        self.res.cookie(F.config.cookie, F.encrypt({
            id: user.id,
            email: user.email,
            ip: self.req.ip
        }, 'user'), new Date().add('5 minutes'));

        // Return result
        self.json({
            r: true,
            user: user
        });
    });

}

// Logoff process
// POST, [+xhr, logged]
function json_logoff() {
    var self = this;
    self.res.cookie(F.config.cookie, '', new Date().add('-1 year'));
    self.redirect('/');
}