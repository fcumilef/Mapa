

let map;
let markers=[]

const setListener = () => {
document.querySelectorAll(".iglesia_individualNames").forEach((hotelName, index) =>{
  hotelName.addEventListener("click", () =>{
    google.maps.event.trigger(markers[index], "click")
  })
})
}

const displayIglesiaList = () => {
 let iglesiaHTML = "";
 iglesias.forEach(iglesia => {
  iglesiaHTML += `<h4 class = "iglesia_individualNames">${iglesia.name}</h4>`
 })
 document.getElementById("iglesia_names").innerHTML = iglesiaHTML;
}

const createMarker = (coord,name, direccion, telefono) =>{
  let html =  `
  <div class="window">
    <h2>${name}</h2>
    <div class="direccion">
      <i class="fas fa-map-marker-alt fa-lg"></i>
      <h3>${direccion}</h3>
    </div>
    <div class="telefono">
      <i class="fas fa-phone-alt fa-lg"></i>
      <h3>${telefono}</h3>
    </div>
  </div>
  `;

  const marker = new google.maps.Marker({
    position: coord,
    map: map,
    icon: "./icons/universal.png"
  });
  google.maps.event.addListener(marker,"click",() => {
    infoWindow.setContent(html);
    infoWindow.open(map,marker);
  });
  markers.push(marker);
}

const createLocationMarkers = () => {
  let bounds = new google.maps.LatLngBounds();
  iglesias.forEach(iglesia => {
    let coord = new google.maps.LatLng(iglesia.lat,iglesia.lng);
    let name = iglesia.name;
    let direccion = iglesia.direccion;
    let telefono = iglesia.telefono;
    bounds.extend(coord);
    createMarker(coord, name, direccion, telefono);
    map.fitBounds(bounds);
  });
}

function iniciarMap(){
  var coord = {lat:-33.5408924, lng:-70.6418907};
  map = new google.maps.Map(document.getElementById('map'),{
    zoom: 14,
    center: coord,
    mapId: "48a9274f304fb8f1"
  });

  createLocationMarkers();

  const marker = new google.maps.Marker({
    position: coord,
    map: map,
  });
  infoWindow = new google.maps.InfoWindow();

  displayIglesiaList();

  setListener();
}