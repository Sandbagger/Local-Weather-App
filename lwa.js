//Store geolocation playload
var visitorLocation = {
  longitude: 23,
  latitude: 1};

 var weatherPayload = [];

//Return visitor long and lat
window.onload = function() {
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
    console.log(position);
    startPos = position;
    visitorLocation.longitude = startPos.coords.longitude;
    visitorLocation.latitude = startPos.coords.latitude;
    console.log("geosucc");
    console.log(visitorLocation.longitude);
    //call weather here because of execution context of this callback
    callOpenWeather();
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  console.log("window onload");
  
};

console.log(visitorLocation.longitude);

//Make weather api call console.log(visitorLocation.longitude);
function callOpenWeather () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat="+visitorLocation.latitude+"&lon="+visitorLocation.longitude+"&APPID=a81ada84fca5c84e4168cd23c53c30f8", true);
  xhr.send(null)
  //Extract weather data from weather payload with icon
  xhr.onload = function () {
       if (xhr.status === 200) {
    parseResponse = JSON.parse(xhr.response);
   extractedWeatherData(parseResponse, updateHTML);
     }  
 else {console.log("error: status is not 200")
      }
 };
 console.log(visitorLocation.longitude)
};

//Extract weather data from weather payload with icon
function extractedWeatherData (response, callback) {
   var temp = response.main.temp;
   var weatherDescription = response.weather[0].description;
   var weatherIcon = response.weather[0].icon;
  callback(temp, weatherDescription, weatherIcon);
}

function updateHTML(temperature, description, icon ) {
  document.getElementById("displayTemp").textContent  = temperature;
  document.getElementById("displayDescription").textContent = description;
  document.getElementById("displayIcon").textContent = icon;
} 