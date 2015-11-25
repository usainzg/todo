// Login and sign-up login

$(function(){

  var $login  = $('article.login');
  var $signUp = $('article.sign-up');

  $signUp.hide();

  $('a.show-sign-up').click(function(){
    $login.hide();
    $signUp.show();
  });

  $('a.show-login').click(function(){
    $signUp.hide();
    $login.show();
  });

});
