// how frequently (in milliseconds) to check the position
var options = {frequency: 1000, timeout: 10000, enableHighAccuracy: true};
var latitude1;
var longitude1;
var latitude2;
var longitude2;
var message;

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //uncomment for testing in Chrome browser
    onDeviceReady();
});

function onDeviceReady() { }

function showPosition() {
    message = "Current Location: Latitude=" + latitude + " Longitude=" + longitude;
    document.getElementById("fitnessData").innerHTML = message;
}

function computeDistance () {
    
    // this converson comes from http://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371000; // radius of the Earth in meters

    var a = latitude1 * Math.PI / 180;
    var b = latitude2 * Math.PI / 180;
    var c = (latitude2-latitude1) * Math.PI / 180;
    var d = (longitude2-longitude1) * Math.PI / 180;
    var e = Math.sin(c/2) * Math.sin(c/2) +
        Math.cos(a) * Math.cos(b) *
        Math.sin(d/2) * Math.sin(d/2);
    var c = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1-e));

    var distance = R * c;

     message = "You traveled " + distance + " meters";
     document.getElementById("fitnessData").innerHTML = message;
}

function getPos1 () { 
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure, options);
    message = "Position 1: Latitude= " + latitude1 + " Longitude= " + longitude1;
    document.getElementById("position1").innerHTML = message;
}

function getPos2 () { 
    navigator.geolocation.getCurrentPosition(onSuccess2, onFailure, options); 
    message = "Position 1: Latitude= " + latitude2 + " Longitude= " + longitude2;
    document.getElementById("position2").innerHTML = message;
}

function onSuccess (position) {
    latitude1 = position.coords.latitude;
    longitude1 = position.coords.longitude;
}

function onSuccess2 (position) {
    latitude2 = position.coords.latitude;
    longitude2 = position.coords.longitude;
}

function onFailure (error) {
    document.getElementById("fitnessData").innerHTML = "Error with Geolocation!";
    var message = 'code: ' + error.code + '<br/>' +
		  'message: ' + error.message + '<br/>';
    document.getElementById("fitnessData").innerHTML = message;
}

function showAbout() {
    var message = "App using Geolocation\n" +
            "Created Spring 2015, IT-360\n" +
            "Tom Narock";
    var title = "About";
    showAlert(message, title);
}

function showAlert(message, title) {
    
    // if we're on a mobile device then use the nicely styled alert
    if (window.navigator.notification) {
        window.navigator.notification.alert(message, null, title, 'OK');
    } else { // if we're viewing on desktop or laptop use the standard alert
        alert(title + ": " + message);
    }
    
}
