$(document).ready(function(){
  $('.ui.sticky')
  .sticky({
    context: '#google-map',
    offset: 20
  });
});
$('#search-term').keydown(function(event){
  if(event.keyCode == 13){
    var searchedTerm = $('#search-term').val();
    getNews(searchedTerm);
    $('#loading').fadeIn(1000);
  }
});
$('#search-button').on('click', function(){
    var searchedTerm = $('#search-term').val();
    getNews(searchedTerm);
    $('#loading').fadeIn(1000);
});

