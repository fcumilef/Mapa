function iniciarMap(){
  var coord = {lat:-33.5408924, lng:-70.6418907};
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 10,
    center: coord
  });

  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}