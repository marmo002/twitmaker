// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("DOMContentLoaded", function() {

  var form = document.querySelector('#new_tweet');
  var ulTweets = document.querySelector('.tweets');

  function makeRequest(){
    $.ajax({
      url: form.getAttribute('action'),
      method: form.getAttribute('method'),
      data: $(form).serialize(),
      dataType: 'JSON',
    }).done(function(response){

      // var liTag = document.createElement('li');
      // liTag.setAttribute('class', 'tweet');
      // var pTag = document.createElement('p');
      // var timeTag = document.createElement('time');
      // var time = new Date(response.created_at);
      //
      // pTag.innerText = response.message;
      // timeTag.innerText = time.toLocaleDateString('eng-US',{ month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', day: 'numeric'});
      // liTag.append(pTag);
      // liTag.append(timeTag);
      // ulTweets.prepend(liTag);

      // response.created_at = new Date(response.created_at).toLocaleDateString('eng-US',{ month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', day: 'numeric'});



      //step 1: fetch the template
      var source = document.getElementById('tweet-template').innerHTML;
      //step 2: Compile the template source code
      var template = Handlebars.compile(source);
      //step 3: Hydrate the template
      var tweetHtml = template(response);
      console.log(tweetHtml);
      //sstep 4: Put the HTML into the page
      ulTweets.insertAdjacentHTML('afterbegin', tweetHtml);

      document.querySelector('textarea').value = '';
    });
  }

  form.addEventListener('submit', function(e){

    e.preventDefault();

    makeRequest();

  });

  var textArea = document.querySelector('textarea')

  textArea.addEventListener('keydown', function(e){
    if (e.which === 13) {
      e.preventDefault();
      makeRequest();
    }
  });


  ulTweets.addEventListener('click', function(e){
      if (e.target.classList.contains('delete-btn')) {
        e.preventDefault();
        e.target.parentNode.remove();
      }
  });

});
