// Login and sign-up login

$(function(){

  var $login  = $('section.login');
  var $signUp = $('section.sign-up');

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
