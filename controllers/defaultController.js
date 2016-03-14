exports.install = function () {
    F.route('/', view_index);
    // or
    // F.route('/');
    F.route('/contact', view_contact);
    F.route('/services/{name}/', view_services);

};

function view_index() {
    var self = this;
    self.view('index', self.req.user);
}

function view_services(name){
    var self = this;
    
    self.view('services', {category : name});    
}

function view_contact() {
    var self = this;
    // "contact" view is routed to views/contact.html
    // ---> Send the response
    self.view('contact');
}

function json_contact(){
    var self = this;
    
    // Get the data from the request body.
    // The data are parsed into the object automatically.
    var model = self.body;

    // e.g.
    // model.email
    // model.name
    
    // Send the mail to our company
    var message = self.mail('info@company.com', 'Contact form', 'mail-template', model);
    message.reply(model.email);
    
     // ---> and send the response in JSON format
    self.json({ success: true });
}