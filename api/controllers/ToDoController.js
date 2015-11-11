/**
 * ToDoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res){
		var todo = req.params.all();
		todo.user = req.session.user.id;
		ToDo.create(todo).exec(function(err, todo){
			if(err) return res.serverError(err);
			return res.redirect('/');
		});
	},
	completed: function(req, res){
		ToDo.update(req.param('id'), { done: true }).exec(function(err, todo){
			if(err) return res.serverError(err);
			return res.redirect('/');
	  });
	},
	update: function(req, res){
		ToDo.update(req.param('id'), req.params.all()).exec(function(err, todo){
			if(err) return res.serverError(err);
			return res.redirect('/');
	  });
	},
	delete:function(req, res){
    ToDo.destroy(req.param('id')).exec(function(err, todo){
        if(err) return res.serverError();
        return res.redirect('/');
    });
	},
	findOne: function(req, res){
		ToDo.findOne(req.param('id')).exec(function(err, todo){
			if(err) return res.serverError();
			return res.view('details', {todo: todo});
		});
	}
};
