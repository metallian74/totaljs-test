exports.install = function () {
	// F.route('/admin/*','viewname', ['authorize']);
	// F.route('/admin/','viewname', ['authorize']);
    F.route('/admin/toto', view_index, ['authorize'] /*,['authorize', '@admin']*/);

};

function view_index() {
    var self = this;
    self.view('/admin/index');
}

// Flags: authorize, !admin
function view_admin() {
	this.plain('ADMIN');
}
