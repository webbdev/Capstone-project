(function(){

'use strict';

// Define the 'worldQuizDetail' module
angular.module('worldQuizDetail', []);

// Register 'worldQuizDetail' component, along with its associated controller and template
angular.
  module('worldQuizDetail').
  component('worldQuizDetail', {
    templateUrl: 'templates/world-quiz-detail.html',
    controller:['$http', '$sce', 'quizFactory', function worldQuizDetailController($http, $sce, quizFactory) {
      	var self = this;

      	$http.get('data/world_quiz.json').then(function(response) {
	        self.questions = response.data;
	        self.totalQuestions = self.questions.length;
	    });

		self.start = function() {
			self.id = 0;
			self.quizOver = false;
			self.inProgress = true;
			self.getQuestion();
		};

		self.reset = function() {
			self.inProgress = false;
			self.score = 0;
			self.index = 1;
			self.percentage = 0;
		}

		self.getQuestion = function() {
			var q = quizFactory.getQuestion(self.id);
			if(q) {
				self.question = q.question;
				self.options = q.options;
				self.answer = q.answer;
				self.answerMode = true;
			} else {
				self.quizOver = true;
			}
		};


		self.correctAnsSound = function() {
	     	var audio = new Audio('audio/correct.mp3');
	        audio.play();
	    };

	    self.wrongAnsSound = function() {
	     	var audio = new Audio('audio/wrong.wav');
	        audio.play();
	    };

		
		self.checkAnswer = function() {

			if(!$('input[name=answer]:checked').length) return;

			var ans = $('input[name=answer]:checked').val();

			if(ans == self.options[self.answer]) {
				self.score++;
				self.correctAns = true;
				self.correctAnsSound();
			 
			} else {
				self.correctAns = false;
				self.wrongAnsSound();
			}
  			
			self.answerMode = false;

			self.percentage = ((self.score / self.totalQuestions)*100).toFixed(2);
		};

		   	self.selectAnsw = function(item) {
		   		self.selectedAnsw = item;
		   	};

		   	self.isActive = function(item) {
		   		return self.selectedAnsw === item;
		   	};


			self.nextQuestion = function() {
				self.index++;
				self.id++;
				self.getQuestion();
			}

			self.reset();
		}]	
	})

	.factory('quizFactory', ['$http', function($http) {
	    var questions ={};

	    $http.get('data/world_quiz.json').success(function(data) {
	        questions = data;
	    });


	    return {
	        getQuestion: function(id) {

	            if(id < questions.length) {
	                return questions[id];
	            } else {
	                return false;
	            }

	        }
	    };
	}]);

})();