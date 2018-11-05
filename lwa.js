//AIzaSyBtskwqZzUziYgldehwnvRtTFVejNAnX3w Google place API


document.addEventListener('DOMContentLoaded', getLocation);
document.addEventListener('DOMContentLoaded', function(){document.querySelector("input[name=checkbox]").addEventListener("click", toggle)})


function toggle () {
  var temp = document.getElementsByClassName("temp")[0].innerText;
  var units = document.querySelector('.temp-data .units').innerHTML;

    if(this.checked) {

 var celsius = (temp - 32) / 1.8;
var celsiusRounded = Math.round(celsius); 
document.getElementsByClassName("temp")[0].innerHTML = celsiusRounded ;
 document.querySelector('.temp-data .units').innerHTML = "&degC";
    } else {
          
 var fahr = (temp * (9/5)) + 32; 
    var fahrRounded = Math.round(fahr);
document.getElementsByClassName("temp")[0].innerText = fahrRounded;
document.querySelector('.temp-data .units').innerHTML = "&degF";

    }
};



var getLocation = function() {
  //console.log("visitor location");
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

getLocation().then(function(position){
  // console.log("visitor location then");
   debugger
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
return Promise.all([
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&result_type=street_address&key=AIzaSyDBrYh7woujepVOlKbmHs5hoIhhO4OjMGM")
    .then(function(data){
      return(data.json())
      .then(function (resp){
      //  console.log(resp)
        var city = resp.results[0].address_components[3].long_name;
        var country = resp.results[0].address_components[6].short_name;
        updatelocation(city, country);
        })
    }),

    fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d0593cabe425939edd51e1834e35f403/"+lat+","+lon).then(function(resp){
      return resp.json()
    }).then(function(data){
        var icon = data.currently.icon;
        var temp = Math.round(data.currently.temperature);
        var sum = data.currently.summary;
         // console.log(sum);
        updateIcon(icon);
        updateTemp(temp);
        updateSummary(sum);
        })
    
])
    })
  .catch(function(err) {
    console.error(err.message);
  });




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


 
    function updateTemp(temp){
      document.getElementsByClassName("temp")[0].innerHTML = temp;
    }




function updatelocation(city, country){
  document.getElementsByClassName("city")[0].textContent = city;
  document .getElementsByClassName("country")[0].textContent = country;
}

function updateSummary(sum){
  document.getElementsByClassName("summary")[0].textContent  = sum;
}




