/**
 * Create google Maps Map instance.
 * @param {number} lat
 * @param {number} lng
 * @return {Object}
 */

const createMap = ({ lat, lng }) => {
  return new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 18,
    zoomControl: false,
    streetViewControl: false,
  });
};

const locataionicon = 'positive.png'

/**
 * Create google maps Marker instance.
 * @param {Object} map
 * @param {Object} position
 * @param {Object} icon
 * @param {Object} animation
 * @return {Object}
 */
const createMarker = ({ map, position, icon, animation }) => {
  return new google.maps.Marker({ map, position, icon, animation });
};

/**
 * Track the user location.
 * @param {Object} onSuccess
 * @param {Object} [onError]
 * @return {number}
 */
const trackLocation = ({ onSuccess, onError = () => { } }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
};

/**
 * Get position error message from the given error code.
 * @param {number} code
 * @return {String}
 */
const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
  }
}

/**
 * Initialize the application.
 * Automatically called by the google maps API once it's loaded.
*/
function init() {
  const initialPosition = { lat: 59.31, lng: 18.06 };
  const map = createMap(initialPosition);
  const myPosition = createMarker({ 
    map, 
    position: initialPosition, 
    icon: locataionicon, 
    animation: google.maps.Animation.BOUNCE });
  const $info = document.getElementById('info');

//Arrey with locations of questions
  /*var locations = [
    ['Fråga 1/10',  59.310212, 18.022568, 'question1.html'],
    ['Fråga 2/10', 59.310939, 18.015303, 'question1.html'],
  ];*/
  
  var infowindow = new google.maps.InfoWindow();

  //Create markers and loop through the arrey
  var marker, circleMarkers, i;

  //Create bounds of circles
  /*google.maps.Circle.prototype.contains = function(latLng) {
    return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
  }*/

for (i = 0; i < myQuestions.length; i++) {

  if(myQuestions[i].answered === false) {
   marker = new google.maps.Marker({
   position: new google.maps.LatLng(myQuestions[i].center),
   //position: new google.maps.LatLng(myQuestions[i].center.lat, myQuestions[i].center.lng),
   map: map,
   label: i+1+""
  });

    //Create circles
    circleMarkers = new google.maps.Circle({
    center:new google.maps.LatLng(myQuestions[i].center),
    radius:20,
  
    strokeColor:"#B40404",
    strokeOpacity:0.6,
    strokeWeight:2,
  
    fillColor:"#B40404",
    fillOpacity:0.1
  });
  circleMarkers.setMap(map);
}

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
   return function() {
     //infowindow.setContent(locations[i][0]);
     //infowindow.open(map, marker);

     showSlide(i);
     //window.location.href = this.url;
     myQuestions[i].answered = true
     //marker.setMap(null);
     document.getElementById("quizdiv").style.display="block";

     console.log(myQuestions[i].answered); //bugtesting
   }
 })(marker, i));

 var nyc = new google.maps.LatLng(myQuestions[i].center);
 var london = new google.maps.LatLng(markerx);
 var distance = google.maps.geometry.spherical.computeDistanceBetween(london, nyc);
 console.log(distance)
}
    
//Keep track of the users location
  let watchId = trackLocation({
    onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
      myPosition.setPosition({ lat, lng });
      map.panTo({ lat, lng });
      $info.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
      $info.classList.remove('error');
    },
    onError: err => {
      console.log($info);
      $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
      $info.classList.add('error');
    }
  });
}