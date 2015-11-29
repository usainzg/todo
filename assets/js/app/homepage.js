$(function(){

  // FIX: Collapsible elements only need initialization if they are added dynamically.
  // You can also pass in options inside the initialization, however this can be done in the HTML markup as well.

  // Explanation, we are not adding them dinamically, we're adding them as static HTML
  // If we had create them via JS, dinamically, we would need the following code

  // $('.collapsible').collapsible({
  //   accordion : false
  // });

  // But in our case we don't need this code, this code cancels the collapsible action
  // Just dropping it it's fixed your problem!!

  // Tomorrow will see it in more detail

});
