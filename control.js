$(document).ready(function(){
  $('.ui.sticky')
  .sticky({
    context: '#google-map'
  });
});
$('#search-term').keydown(function(event){
  if(event.keyCode == 13){
    var searchedTerm = $('#search-term').val();
    getNews(searchedTerm);
  }
});
$('#search-button').on('click', function(){
    var searchedTerm = $('#search-term').val();
    getNews(searchedTerm);
    $('#loading').fadeIn(3000);
});