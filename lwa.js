//AIzaSyBtskwqZzUziYgldehwnvRtTFVejNAnX3w Google place API
var add = (function () {
    var counter = 0;
    return function () {counter += 1;
              unitConversion(counter)  }
})();

document.addEventListener('DOMContentLoaded', visitorLocation);
document.addEventListener('DOMContentLoaded', function(){document.getElementsByClassName("temp")[0].addEventListener("click", add)})



function unitConversion(counter){
  var temp = +document.getElementsByClassName("temp")[0].innerText
var altTemp = +document.getElementsByClassName("alt-temp")[0].innerText
    if (counter % 2 === 0) {
    var fahr = (temp * (9/5)) + 32; 
    var fahrRounded = Math.round(fahr);
document.getElementsByClassName("temp")[0].innerText = fahrRounded;
document.getElementsByClassName("units")[0].innerText = "°F";

 var celsius = (altTemp - 32) / 1.8;
var celsiusRounded = Math.round(celsius);
document.getElementsByClassName("alt-temp")[0].innerText = celsiusRounded;
 document.getElementsByClassName("alt-units")[0].innerText = "°C";

  }
  else {
    var celsius = (temp - 32) / 1.8;
var celsiusRounded = Math.round(celsius);
document.getElementsByClassName("temp")[0].innerText = celsiusRounded;
 document.getElementsByClassName("units")[0].innerText = "°C";
 
 var fahr = (altTemp * (9/5)) + 32; 
    var fahrRounded = Math.round(fahr);
document.getElementsByClassName("alt-temp")[0].innerText = fahrRounded;
document.getElementsByClassName("alt-units")[0].innerText = "°F";

 }
}




function visitorLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  });
}

visitorLocation().then(function(arr){
  var lat = arr[0];
  var lon = arr[1];
return Promise.all([
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyDBrYh7woujepVOlKbmHs5hoIhhO4OjMGM").then(function(data){
      return(data.json())
      .then(function (resp){
        console.log(resp);
        var city = resp.results[0].address_components[3].long_name;
        var country = resp.results[0].address_components[6].short_name;
        updatelocation(city, country);
        console.log(city);
        console.log(country);
        })
    }),

    fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d0593cabe425939edd51e1834e35f403/"+lat+","+lon).then(function(resp){
      return resp.json()
    }).then(function(data){
        var icon = data.currently.icon;
        var temp = Math.round(data.currently.temperature);
        updateIcon(icon);
        updateTemp(temp);
        console.log(data)
        })
    
]);
    })



function updateIcon(weather){
  var iconSelector = document.getElementsByTagName("canvas")[0];
  iconSelector.setAttribute("id", weather);

  var icon = new Skycons({"color": "white",
                              "resizeClear": true}) 
  var iconArr = [ 
     {weather: "clear-day",
     func:function(){return icon.set("clear-day", Skycons.CLEAR_DAY)}
    },
     {weather: "clear-night",
      func: function(){return icon.set("clear-night", Skycons.CLEAR_NIGHT)}
      },
     {weather: "partly-cloudy-day",
     func: function(){return  icon.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY)}
    },
     {weather: "partly-cloudy-night",
      func: function(){return icon.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT)}
      },
     {weather: "cloudy",
      func: function(){return icon.set("cloudy", Skycons.CLOUDY)}
      },
     {weather: "rain",
      func: function(){return  icon.set("rain", Skycons.RAIN)}
      },
     {weather: "sleet",
      func: function(){return  icon.set("sleet", Skycons.SLEET)}
      },
     {weather: "snow",
      func: function(){return  icon.set("snow", Skycons.SNOW)}
      },
     {weather: "wind",
      func: function(){return  icon.set("wind", Skycons.WIND)}
      },
     {weather: "fog",
      func: function(){return icon.set("fog", Skycons.FOG)}
      }
      ];

    var deploy = iconArr.find(function(ob){
      if (ob.weather === weather) {
          return ob.func();
        }
      })

      icon.play();
  
}

function updateTemp(t){
  var temp = document.getElementsByClassName("temp")[0].textContent = t;

  var altTemp = document.getElementsByClassName("alt-temp")[0].textContent =  Math.round((temp - 32) / 1.8);
}

function updatelocation(city, country){
  document.getElementsByClassName("city")[0].textContent = city;
  document .getElementsByClassName("country")[0].textContent = country;
}







