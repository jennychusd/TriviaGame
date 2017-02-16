var game = {
	remainingTime: 10,
	winsCount: 0,
	losesCount: 0,
	questionCount: 0,
	myTimer: null,
	currentAns: null,

	newQuestion: function() {
		// clear and restart timer
		this.clearTimer();
		this.startTimer();
		// reset answer options background color
		$(".choices").css("background-color","#fff")
		// pick new question
		questionObj = availableQuestions[this.questionCount];
		this.questionCount++;
		console.log(questionObj);

		// store answer
		currentAns = questionObj.answer;

		// display question and answers of question picked
		$("#displayQuestion").html(questionObj.question);
		$("#firstChoice").html(questionObj.options[0]);
		$("#secondChoice").html(questionObj.options[1]);
		$("#thirdChoice").html(questionObj.options[2]);
		$("#fourthChoice").html(questionObj.options[3]);
	},

	startTimer: function() {
		this.remainingTime = 10;
		$("#timeLeft").html(this.remainingTime);
		game.myTimer = setInterval(function(){
			// subtract one on time remaining per second
			game.remainingTime -= 1;
			$("#timeLeft").html(game.remainingTime);
			if(game.remainingTime === 0) {
				game.outOfTime();
				// HIGHLIGHT BACKGROUND OF CORRECT ANSWER
				for (var i=0; i < questionObj.options.length; i++) {
					if (currentAns === questionObj.options[i]) {
						var correctAns = $(".answerChoices").children.eq(0).children.eq(i);
						
					};
				};
			};
		}, 1000)
		
	},

	clearTimer: function() {
		clearInterval(game.myTimer);
	},

	winGame: function() {
		// increase Wins count by one
		this.winsCount += 1;
		$("#winsCount").html(this.winsCount);
		// announce you won
		$("#displayAnnounce").html("You're a wizard Harry!");
		// start new question
		// DELAY THE CALL OF THIS FUNCTION
		this.newQuestion();
	},

	loseGame: function() {
		// increase Loses count by one
		this.losesCount += 1;
		$("#losesCount").html(this.losesCount);
		// announce you lost
		$("#displayAnnounce").html("Whomp whomp");
		// start new question
		// DELAY THE CALL OF THIS FUNCTION
		this.newQuestion();
	},

	outOfTime: function() {
		// increase Loses count by one
		this.losesCount += 1;
		$("#losesCount").html(this.losesCount);
		// announce out of time
		$("#displayAnnounce").html("Out of time!");
		// start new question
		this.newQuestion();
	},	
};

var availableQuestions = [
  {
    question: "What fruit must one tickle to gain access to the kitchens?",
    answer: "Pear",
    options: ["Grape", "Pear", "Orange", "Apple"]
  },
  {
    question: "What is the title of the first chapter of The Chamber of Secrets?",
    answer: "The Worst Birthday",
    options: ["The Worst Birthday", "Dobby's Warning", "The Burrow", "Owl Post"]
  },
  {
    question: "What year did Lily and James Potter die?",
    answer: "1981",
    options: ["1987", "1985", "1981", "1980"]
  },
  {
    question: "What was the last name of Professor Trelawney's former husband?",
    answer: "Higglebottom",
    options: ["Stroker", "Peucey", "Higglebottom", "Niggemeyer"]
  },
  {
    question: "Who is only a day older than Harry?",
    answer: "Neville Longbottom",
    options: ["Draco Malfoy", "Dudley Dursley", "Hermoine Granger", "Neville Longbottom"]
  },
  {
    question: "Which of these ingredients is not used in a Polyjuice Potion?",
    answer: "Powdered Unicorn Horn",
    options: ["Powdered Unicorn Horn", "Powdered Bicorn Horn", "Leeches", "Lacewing Flies"]
  },
  {
    question: "What do cats do to Hagrid?",
    answer: "Make him sneeze",
    options: ["Make him angry", "Cause him pain", "Make him lauch", "Make him sneeze"]
  },
  {
    question: "What is Hermoine Granger's Patronus?",
    answer: "Otter",
    options: ["Hare", "Owl", "Otter", "Ferret"]
  },
  {
    question: "Which Muggle candy did the Trolly Witch not sell, which Harry loved?",
    answer: "Mars Bars",
    options: ["Kit Kats", "Mars Bars", "Hershey Bars", "Snickers"]
  },
]

$("#startGame").on("click", function() {
	// call newQuestion function
	game.newQuestion();

	// change visibility of question and answers to visible
	$("#displayQuestion").css("visibility","visible");
	$(".choices").css("visibility","visible");

	// change visibility of Start Game button to hidden
	$("#startGame").css("visibility","hidden");

});

$(".choices").on("click", function() {
	// store user choice
	var userChoice = $(this).text();
	console.log("User choice: " + userChoice);

	// check if user guess is correct
	for (var i=0; i < availableQuestions.length; i++) {
		if (userChoice === questionObj.answer) {
			// user wins
			game.winGame();
			return
		} else {
			// user loses
			game.loseGame();
			return
		}
	}
});
