$(function(){
  var page = 1;
  var $btnLoadTodos = $('button#load-todos');
  var $todoList = $('ul#todo-list');

  $btnLoadTodos.on('click', function buttonClicked(){
    $btnLoadTodos.attr('disabled', true).text('Loading...');
    $.ajax({
      url: '/todos',
      type: 'GET',
      data: {
        page: page
      }
    }).done(function(data){
      // If all OK!
      data.todos.forEach(function(todo){
        $todoList.append('<li>' + todo.title + '</li>');
      });
      page += 1;
      $btnLoadTodos.attr('disabled', false).text('LOAD MORE TODOS');
    }).error(function(err){
      // ERROR!!
      console.log('Error:', err);
      $btnLoadTodos.attr('disabled', false).text('LOAD MORE TODOS');
    });
  });

});
