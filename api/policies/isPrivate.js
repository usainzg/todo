module.exports = function(req, res, next){

  ToDo.findOne(req.param('id')).exec(function(err, todo){
    if(err) return res.serverError(err);
    if(!todo) return res.notFound();
    if(!todo.private || req.session.user.id === todo.user) return next();
    return res.forbidden();
  });
};
