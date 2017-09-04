var addListenerToButton = function(){
  var getPermission = document.getElementById("permission");
getPermission.addEventListener("click", visitorLocation);
}

document.addEventListener('DOMContentLoaded', addListenerToButton);

//visitor long and lat
var visitorLocation = function() {
 
  var geoOptions = {
     timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
   var long = position.coords.longitude;
   var lat = position.coords.latitude;
   console.log("longitude " + long);
   console.log("latitude " + lat);

   //pass coordinates to weather API
    callOpenWeather(long, lat);
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  //must go after callback definitions due to hoisting
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  
};

function callOpenWeather(longitude, latitude) {
  var xhr = new XMLHttpRequest();
  //modify URL with coordinates
  xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=imperial&APPID=a81ada84fca5c84e4168cd23c53c30f8", true);
  xhr.send(null);
  //Extract weather data from weather payload
  xhr.onload = function () {
       if (xhr.status === 200) {
    parseResponse = JSON.parse(xhr.response);
   extractedWeatherData(parseResponse, updateHTML);
     }  
 else {console.log("error: status is not 200")
      }
 };
};

//Extract weather data from weather payload with icon
function extractedWeatherData (response, callback) {
   var temp = response.main.temp;
   var weatherDescription = response.weather[0].description;
   var weatherIcon = response.weather[0].icon;
   var city = response.name;
   var country = response.sys.country;
  callback(temp, weatherDescription, weatherIcon, city, country);
  updateIconURL(weatherIcon);
}

function updateHTML(temperature, description, icon, city, country) {
  document.getElementById("displayTemp").textContent  = Math.round(temperature);
  document.getElementById("displayDescription").textContent = description;
  document.getElementById("title").textContent = city + ", " + country;
  var button = document.getElementById("displayTemp");
button.addEventListener("click", add);
reveal();

} 

function updateIconURL(icon) {
  url = "http://openweathermap.org/img/w/"+icon+".png";
   var image = document.getElementById("imageIcon");
   image.src = url;
}

var add = (function () {
    var counter = 0;
    return function () {counter += 1;
              unitConversion(counter)  }
})();


function unitConversion(counter){
  var temp = +document.getElementById("displayTemp").innerText;
  if (counter % 2 === 0) {
    var fahr = (temp * (9/5)) + 32; 
    var fahrRounded = Math.round(fahr);
document.getElementById("displayTemp").innerText = fahrRounded;
document.getElementById("unit").innerText = "°F";
  }
  else {
    var celsius = (temp - 32) / 1.8;
var celsiusRounded = Math.round(celsius);
document.getElementById("displayTemp").innerText = celsiusRounded;
 document.getElementById("unit").innerText = "°C";
 }
}

//reveal div containing weatehr data 
function reveal() {
var data = document.getElementById("reveal");
var getPermission = document.getElementById("permission");
data.style.display = "flex";
getPermission.style.display = "none";
}

