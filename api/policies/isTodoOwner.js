
module.exports = function(req, res, next){

  // req.param('id') === id modificar
  // todo.user === req.session.user.id
  ToDo.findOne(req.param('id')).exec(function(err, todo){
    if(err) return res.serverError(err);
    if(!todo) return res.notFound();
    if(req.session.user.id === todo.user) return next();
    return res.forbidden();
  });


};
