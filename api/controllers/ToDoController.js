/**
 * ToDoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res){
    var todo = req.params.all();
    if(req.param('private') === 'on') todo.private = true;
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
    ToDo.findOne(req.param('id')).populate('likes').exec(function(err, todo){
      if(err) return res.serverError();
      return res.view('details', {todo: todo, me: req.session.user});
    });
  },
  like: function(req, res){
    var todo = req.param('id');
    var user = req.session.user.id;
    UserLike.create({user: user, todo: todo}).exec(function(err, like){
      if(err) return res.serverError(err);
      return res.redirect('/detail/' + like.todo);
    });
  },
  getTodos: function(req, res){
    var page = parseInt(req.param('page'));
    if(!_.isNumber(page)) return res.badRequest();
    ToDo
      .find({
        or: [
          {private: false},
          {user: req.session.user.id}
        ]
      })
      .sort('createdAt DESC')
      .populate('user')
      .limit(2)
      .skip(page * 2)
      .exec(function(err, todos){
        if(err) return res.serverError(err);
        return res.json({ todos: todos });
      });
  }
};
