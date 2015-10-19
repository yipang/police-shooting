// Function to draw your map
var drawMap = function() {

  // Create map and set view
  var map = L.map('mapdiv').setView([50, -100], 5);

  // Create a tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

  // Add the layer to your map
  layer.addTo(map);

  // Execute your function to get data
  getData(map);
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
  $.ajax({
    url:'data/response.json',
    type: "get",
    success:function(data) {
        customBuild(data, map);
    },
    dataType:"json",
  })
  // When your request is successful, call your customBuild function
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	// Be sure to add each layer to the map
  var femaleLayer = new L.LayerGroup([]);
  var maleLayer = new L.LayerGroup([]);
  var notSure = new L.LayerGroup([]);

  data.forEach(function(data) {

    if (data["Victim's Gender"] == 'Female') {
      var circle = new L.circleMarker([data["lat"], data["lng"]], {
        radius: 7,
        fillOpacity: 0.4,
        color: red
      }); 
      circle.addTo(femaleLayer);     
    } else if (data["Victim's Gender"] == 'Male') {
      var circle = new L.circleMarker([data["lat"], data["lng"]], {
        radius: 7,
        fillOpacity: 0.4,
        color: black
      });
      circle.addTo(maleLayer);         
    } else {
        var circle = new L.circleMarker([data["lat"], data["lng"]], {
        radius: 7,
        fillOpacity: 0.4,
        color: grey
      });
      circle.addTo(notSure);   
    }
  });
      
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  var genderLayers = {
    "male": maleLayer,
    "female": femaleLayer,
    "notSure": notSure,
  }
  L.control.layers(null, genderLayers).addTo(map);
  
}


