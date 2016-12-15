(function() {
  'use strict';

  if (navigator.serviceWorker){
      navigator.serviceWorker.register('./sw.js').then(function(e){
        console.log('Registration worked');
      }).catch(function(){
        console.log('Registration failed');
      })
  }

  // Define the 'quizApp' module
  var app = angular.module('quizApp', [
    'ngRoute',
    'ngResource',
    'main',
    'settings',
    'help',
    'quizzesList',
    'capitalsQuiz',
    'capitalsQuizDetail',
    'worldQuiz',
    'worldQuizDetail',
    'getLocation'
  ])

   .config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<main></main>'
        }).
        when('/quizzes-list', {
          template: '<quizzes-list></quizzes-list>'
        }).
        when('/quizzes-list/capitals', {
          template: '<capitals-quiz></capitals-quiz>'
        }).
        when('/quizzes-list/capitals/:continentId', {
          template: '<capitals-quiz-detail></capitals-quiz-detail>'
        }).
        when('/quizzes-list/world', {
          template: '<world-quiz></world-quiz>'
        }).
        when('/quizzes-list/world/quiz', {
          template: '<world-quiz-detail></world-quiz-detail>'
        }).
        when('/quizzes-list/location', {
          template: '<get-location></get-location>'
        }).
        when('/settings', {
          template: '<settings></settings>'
        }).
        when('/help', {
          template: '<help></help>'
        }). 
        otherwise('/');
    }
  ]);

})();

