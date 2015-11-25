/**
 * UserLikesController
 *
 * @description :: Server-side logic for managing Userlikes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create:function(req, res){
		var data = {
			todo: req.param('id'),
			user: req.session.user.id
		};
		UserLikes.create(data).exec(function(err, like){
			if(err) return res.serverError(err);
			return res.redirect('/detail/' + req.param('id'));
		});
	},
	delete:function(req, res){
		var data = {
			todo: req.param('id'),
			user: req.session.user.id
		};
		UserLikes.destroy(data).exec(function(err, like){
			if(err) return res.serverError(err);
			return res.redirect('/detail/' + req.param('id'));
		});
	},
	getLikes:function(req, res){
		UserLikes
			.find({todo: req.param('id')})
			.populate('user')
			.exec(function(err, likes){
				if(err) return res.serverError(err);
				return res.view('likes', {likes: likes});
			});
	},

};
