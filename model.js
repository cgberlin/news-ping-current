var map;
var lat;
var lon;
function initMap() {
  map = new google.maps.Map(document.getElementById('google-map'), {
    center: {lat: 37.09024, lng: -95.712891},
    zoom: 2,
    mapTypeId: 'hybrid',
    tilt: 45
  });
}

function getNews(searchedTerm){
  $('html, body').animate({ scrollTop: $(document).height() - $(window).height() }, 1000);
  $('#result-box').html("<h3>Results</h3><br/>")
  var data =  $.ajax({
      url: 'https://webhose.io/search?token=6d04227b-527e-44e7-8a24-02f82b35d219&format=json&q=' + searchedTerm + '&sort=relevancy', // The URL to the API. You can get this in the API page of the API you intend to consume
      type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
      data: {}, // Additional parameters here
      dataType: 'json',
      success: function(data) { processData(data, searchedTerm); },
      error: function(err) { alert(err); }
  });
}



function processData(data, searchedTerm){
  $.ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchedTerm + '&key=AIzaSyARDN61Jw_oqPZgWoquQgTXGtxtvFx3yzk',
      success: function(data){
        console.log(data.results[0].geometry.location);
        lat = parseFloat(data.results[0].geometry.location.lat);
        lon = parseFloat(data.results[0].geometry.location.lng);
        var latLng = new google.maps.LatLng(lat, lon);
        map.panTo(latLng);
      },
      error: function(err) {alert('Not a valid search');}
    }).then(function(){
          for (var i=0; i < 11; i++){
            console.log(data.posts[i]);
            $('#result-box').append("<p>" + data.posts[i].title + "<p><br/>");
            $('#secondary-result-box').append("<p>" + data.posts[i].title + "<p><br/>");
            var infowindow = new google.maps.InfoWindow({
                              content: data.posts[i].text
                            });
            lon += .5;
            var marker = new google.maps.Marker({
                          position: {lat: lat, lng: lon},
                          map: map,
                          title: data.posts[i].title
                        });
                        marker.addListener('click', function() {
                          map.setZoom(8);
                          map.setCenter(marker.getPosition());
                          infowindow.open(map, marker);7
                    });
          }
          $('#loading').fadeOut(1500);
        });
}
