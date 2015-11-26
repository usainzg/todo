/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res){
		User.create(req.params.all()).exec(function(err, user){
			if(err) return res.serverError(err);
			return res.redirect('/');
		});
	},
	login: function(req, res){
		User.login(req.param('email'), req.param('password'), function(err, user){
			if(err) return res.serverError(err);
			if(!user) return res.redirect('/');
			req.session.authenticated = true;
			req.session.user = user.toJSON();
			return res.redirect('/');
		});
	},
	logout:function(req, res){
		req.session.destroy();
    return res.redirect('/');
	}

};
