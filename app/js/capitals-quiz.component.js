(function() {
'use strict';

// Define the 'capitalsQuiz' module
angular.module('capitalsQuiz', []);

// Register 'capitalsQuiz' component, along with its associated controller and template
angular.
  module('capitalsQuiz').
  component('capitalsQuiz', {
    templateUrl: 'templates/capitals-quiz.html',
    controller:['$http', function capitalsQuizController($http) {
      var self = this;

      $http.get('data/continents.json').then(function(response) {
        self.continents = response.data;
      });

    }]
  });

})();


