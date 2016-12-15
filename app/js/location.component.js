(function() {
'use strict';

// Define the 'getLocation' module
angular.module('getLocation', []);

// Register 'getLocation' component, along with its associated controller and template
angular.
  module('getLocation').
  component('getLocation', {
    templateUrl: 'templates/location.html',
    controller:['$sce', function getLocationController($sce) {
      var self = this;


      self.geoFindMe = function geoFindMe() {
		  var x = document.getElementById("out");

		  if (!navigator.geolocation){
		    self.x.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		    return;
		  }

		  self.success = function(position) {
		    var latitude  = position.coords.latitude;
		    var longitude = position.coords.longitude;

		    x.innerHTML = '<p><strong>Latitude:</strong> ' + latitude + '° <br><strong>Longitude:</strong> ' + longitude + '°</p>';

		    var img = new Image();
		    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=380x280&sensor=false";
		    img.alt = "Map";
		    x.appendChild(img);
		  }

		  self.error = function() {
		    x.innerHTML = "Unable to retrieve your location";
		  }

		  x.innerHTML = "<p>Locating…</p>";

		  navigator.geolocation.getCurrentPosition(self.success, self.error);
		

		  return geoFindMe;
		};


    }]
  
  })


})();
