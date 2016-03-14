exports.install = function () {
    F.route('/admin/', view_index, ['authorize', '@admin']);
    // or
    // F.route('/');
	F.route('/admin/users', view_admin, ['authorize', '@admin']);

};

function view_index() {
    var self = this;
    self.view('/admin/index');
}

// Flags: authorize, !admin
function view_admin() {
	this.plain('ADMIN');
}
