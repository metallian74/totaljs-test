exports.install = function () {

    //    F.route('/', view_profile, ['authorize'])
    F.route('/', json_login, ['xhr', 'post']);
    F.route('/xhr/login/', json_login);
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
    
    var model = this.body;
    // var error = this.validate(model,    );

    this.view('');
    
}

// Login process
// POST, [xhr, unlogged]
function json_login() {
    var self = this;
    var error = self.validate(self.post, ['email', 'password']);
    // var auth = MODULE('auth');

    if (self.user !== null) {
        error.add('Logged');
        self.json(error);
        return;
    }

    F.DAL.user.login(self.body.email, self.body.password, function (res) {

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

        F.cache.set('user_' + user.id, user, '5 minutes');

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
    var user = this.user;

    // remove cookie
    // remove user session
    this.res.cookie(F.config.cookie, '', new Date().add('-1 year'));
    // 
    this.redirect('/');
}






