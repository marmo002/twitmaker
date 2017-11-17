// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("DOMContentLoaded", function() {

  var tweetForm = document.getElementById('new_tweet');

  console.log(tweetForm);
  tweetForm.addEventListener('submit', function(e){

    e.preventDefault();

    $.ajax({
      url: tweetForm.getAttribute('action'),
      method: tweetForm.getAttribute('method'),
      dataType: 'HTML',
      data: $(tweetForm).serialize()
    }).done(function(tweet){
      console.log(tweet);
      var ul = document.querySelector('.tweets');
      ul.insertAdjacentHTML('afterbegin', tweet);
    });
  });

});
