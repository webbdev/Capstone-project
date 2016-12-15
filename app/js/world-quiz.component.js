(function() {
'use strict';

// Define the 'worldQuiz' module
angular.module('worldQuiz', []);

// Register 'worldQuiz' component, along with its associated controller and template
angular.
  module('worldQuiz').
  component('worldQuiz', {
    templateUrl: 'templates/world-quiz.html',
    controller: function worldQuizController() {
      var self = this;
    }
    
  });

})();