(function() {
'use strict';

// Define the 'settings' module
angular.module('settings', []);

// Register 'settings' component, along with its associated controller and template
angular.
  module('settings').
  component('settings', {
    templateUrl: 'templates/settings.html',
    controller:[ function settingsController() {
      	var self = this;


 	// Add Background Music to App
		var audio = new Audio();   
			audio.src = 'audio/delmar.mp3';
			audio.controls = true;
			audio.autoplay = false;
			audio.loop = true;

		self.togglePlay1 = function() {
			return audio.paused == true ? audio.play() : audio.pause();
		};

		var audio2 = new Audio();   
				audio2.src = 'audio/elcorazon.mp3';
				audio2.controls = true;
				audio2.autoplay = false;
				audio2.loop = true;

		self.togglePlay2 = function() {	
			if (audio2.paused == true) {
				audio2.play();
			} else {
				audio2.pause();
				self.currentTime = 0;
			} 
		};


		// Get Date
		self.d = new Date();

    }]
  });

})();


