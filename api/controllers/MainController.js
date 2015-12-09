/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res){
    if(req.session && req.session.authenticated){
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
        .exec(function(err, todos){
          if(err) return res.serverError(err);
          return res.view('homepage', { todos: todos });
        });
    }else{
      return res.view('login');
    }
  }
};
