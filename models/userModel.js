var schema = SCHEMA('default-grp');
var User = schema.add('user');

User.define('id', Number);
User.define('username', 'string(50)', true);
User.define('email', String);
User.define('createdAt', Date);

User.setValidate(function (name, value, path, schema, model) {
	switch(name)
	{
		case 'username':
			if(value.length < 6)
            	return 'username-s';
            if(value.length > 15)
            	return 'username-l';

            F.DAL.validateName(value,  function(res){ //if already taken
            		return res ? 'username-t': false;
            })

		case 'terms':
            return value.toString().parseBool();
        case 'email':
            if(value.isEmail())
            	F.DAL.validateEmail(function(res){
					return res ? 'email-t': false;
            	});
            else
            	return 'email';
        case 'password': 
        	return value.length >= 6 ? true : 'passmin'; 
	}
});

exports = User;