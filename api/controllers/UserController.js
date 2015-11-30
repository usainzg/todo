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
			console.log(user);
			return res.redirect('/');
		});
	},
	logout:function(req, res){
		req.session.destroy();
    return res.redirect('/');
	},

	findOne: function(req, res){
		User.findOne(req.param('id')).exec(function(err, user){
			if(err) return res.serverError(err);
			if(!user) return res.notFound();
			UserLikes.count({ user: user.id }).exec(function(err, likes){
				if(err) return res.serverError(err);
				ToDo.count({ user:user.id }).exec(function(err, todoNum){
					if(err) return res.serverError(err);
					ToDo.find({ user: user.id }).limit(20).sort('createdAt ASC').exec(function(err, todos){
						if(err) return res.serverError(err);
						return res.view('profile', { user: user, likes: likes, todoNum: todoNum, todos: todos });
					});
				});
			});

		});
	},
	findUserLikes: function(req, res){
		UserLikes.find({ user: req.param('id') }).exec(function(err, likes){
			if(err) return res.serverError();
			likes = _.filter(likes, function(like){
				if(_.isObject(like.todo)) return like;
			});
			res.view('userLikes', { userLikes: likes });
		});
	}

};
