/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    email: {
      type: 'email',
      maxLength: 50,
      unique: true,
      required: true
    },
    password:{
      type:'string',
      maxLength:50,
      required:true,
      minLength:6
    },
    nickname:{
      type:'string',
      unique:true,
      required:true,
      maxLength:30
    },
    name:{
      type:'string',
      maxLength:60
    },

    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeCreate: function(values, next) {
    if(values.password) hashPassword(values, next);
    else next();
  },

  login: function(email, password, cb){
    User
			.findOne({email: email})
			.exec(function(err, user){
				if(err) return cb(err);
				if(!user) return cb();
				bcrypt.compare(password, user.password, function(err, valid){
					if(err || !valid) return cb(err);
					return cb(null, user);
				});
			});
  },

};

function hashPassword(values, next) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(values.password, salt, function(err, hash) {
      if (err) return next(err);
      values.password = hash;
      next();
    });
   });
}
