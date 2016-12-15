(function(){

'use strict';

// Define the 'capitalsQuizDetail' module
angular.module('capitalsQuizDetail', [
	'ngRoute'
]);

// Register 'capitalsQuizDetail' component, along with its associated controller and template
angular.
  module('capitalsQuizDetail').
  component('capitalsQuizDetail', {
    templateUrl: 'templates/capitals-quiz-detail.html',
    controller:['$http', '$routeParams', '$sce', function capitalsQuizDetailController($http, $routeParams, $sce) {
      	var self = this;

        self.capitals = {};

      	$http.get('data/' + $routeParams.continentId + '.json').then(function(response) {
	        self.continent = response.data;

	        self.totalQuestions = self.continent.capitals.length;

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
		};

		self.getQuest = function(id) {
			for (var i = 0; i < self.continent.capitals.length; i++)

				if(id < self.continent.capitals.length) {
		                return self.continent.capitals[id];
		            } else {
		              	return false;
		        }
		};


		self.getQuestion = function() {
			
			var q = self.getQuest(self.id);
			if(q) {
				self.question = q.question;
				self.options = q.options;
				self.answer = q.answer;
				self.image_Url = q.image_Url;
				self.image_alt = q.image_alt;
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

})();