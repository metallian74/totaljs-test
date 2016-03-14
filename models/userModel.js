var schema = SCHEMA('default');
var User = schema.add('user');

User.define('username', 'string(50)', true);

User.setValidate(function () {

})