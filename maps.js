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

const locataionicon = 'positive.png' //icon for player
var myCoords; //veriable for players position to be used in other functions
var myLat; //variable to be used in myCoords
var myLng; //variable to be used in myCoords
var quizCoords; //veriable to be set fot the coordinate of the question the player wants to answer
var distance; // distance between player and the question

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
  
  var infowindow = new google.maps.InfoWindow();

  //Create markers and loop through the arrey
  var marker, circleMarkers, i;

for (i = 0; i < myQuestions.length; i++) {

  if(myQuestions[i].answered === false) {
   marker = new google.maps.Marker({
   position: new google.maps.LatLng(myQuestions[i].center),
   //position: new google.maps.LatLng(myQuestions[i].center.lat, myQuestions[i].center.lng),
   map: map,
   label: i+1+""
  });

    //Create circles to show where you have to be within to answer question
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
    

     //window.location.href = this.url;

     //on click, set coordinates for the question to the veriable quizCoords:
     quizCoords = new google.maps.LatLng(myQuestions[i].center);
     //on click, check distance between the question and the player:
     distance = google.maps.geometry.spherical.computeDistanceBetween(myCoords, quizCoords);
     console.log(distance); //bugtesting

     //if distance is within 20 meters, show the question, hide the marker and set the question to answered:
     if (distance<20) {
     //show the right question
     showSlide(i);
     document.getElementById("quizdiv").style.display="block";

     myQuestions[i].answered = true;
     marker.setMap(null);

     console.log(myQuestions[i].answered); //bugtesting
    }
   }
 })(marker, i));
 //bugtesting:
 //console.log(distance);
 //console.log("NYC " + quizCoords);
 //console.log("London " + myCoords);
}

//Keep track of the players location and update players location when the players position is changed:
  const watchId = trackLocation({
    onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
      myPosition.setPosition({ lat, lng });
      map.panTo({ lat, lng });
      $info.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
      $info.classList.remove('error');
      myLat = lat;
      myLng = lng;
      myCoords = new google.maps.LatLng(myLat, myLng);
      //console.log(myLat);
      //console.log(myLng);
    },
    onError: err => {
      console.log($info);
      $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
      $info.classList.add('error');
    }
  });
  /*
  Buggtesting:
  const interval = setInterval(function() {
      console.log(myLat);
      console.log(myLng);
      console.log("London" + london);
      console.log(distance);
  }, 5000);
  */

}

