window.lat = 59.310212;
window.lng = 18.024296;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
    }
  
    return null;
};

function updatePosition(position) {
  if (position) {
    window.lat = position.coords.latitude;
    window.lng = position.coords.longitude;
  }
}

setInterval(function(){updatePosition(getLocation());}, 3000);
  
function currentLocation() {
  return {lat:window.lat, lng:window.lng};
};

var map;
var yourPosition;

//Arrey with coordinates
var myLatLng = [];
myLatLng[0] = {lat:"", lng: ""};
myLatLng[1] = {lat:"", lng: ""}
myLatLng[0] = {lat: 59.310212, lng: 18.022568};
myLatLng[1] = {lat: 59.310939, lng: 18.015303};

var initialize = function() {
  var locataionicon = 'positive.png'

  map  = new google.maps.Map(document.getElementById('map-canvas'), {center:{lat:window.lat,lng:window.lng},zoom:18});
  yourPosition = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map, icon:locataionicon});

  var url = 'question1.html';

  //Adds markers to map
  var marker = new google.maps.Marker({position: myLatLng[0], map: map, title: 'Fråga 1', label: '1'});
  var marker = new google.maps.Marker({position: myLatLng[1], map: map, title: 'Fråga 1', label: '2'});

  google.maps.event.addListener(marker, 'click', function() {
    window.location.href = this.url;
  });
  

};

window.initialize = initialize;

var redraw = function(payload) {
  lat = payload.message.lat;
  lng = payload.message.lng;

  map.setCenter({lat:lat, lng:lng, alt:0});
  mark.setPosition({lat:lat, lng:lng, alt:0});
};

var pnChannel = "map2-channel";

var pubnub = new PubNub({
  publishKey:   'pub-c-a309b60b-bdc8-43f0-b0d0-fd4c2a512493',
  subscribeKey: 'sub-c-6dba7626-ff05-11e9-8dd7-ca99873d233c'
});

pubnub.subscribe({channels: [pnChannel]});
pubnub.addListener({message:redraw});

setInterval(function() {
  pubnub.publish({channel:pnChannel, message:currentLocation()});
}, 3000);