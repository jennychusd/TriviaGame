var game = {
	remainingTime: 10,
	winsCount: 0,
	losesCount: 0,
	questionCount: 0,
	myTimer: null,
	currentAns: null,
    firstClick: true,
    choices: [],

	newQuestion: function() {
		// make sure user doesn't click multiple times per question
        this.firstClick = true;
        // remove highlights
        $(".choices").removeClass("correctAns selectedAns");
        // clear announcements
        $("#displayAnnounce").html("");
		// restart timer
		this.startTimer();
		// reset answer options background color
		// $(".choices").css("background-color","#fff")
		// pick new question
		questionObj = availableQuestions[this.questionCount];
		this.questionCount++;
		console.log(questionObj);

		// store answer
		this.currentAns = questionObj.answer;
        console.log("Current answer is: " + this.currentAns);

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
                game.firstClick = false;
				game.outOfTime();
			};
		}, 1000)
		
	},

	clearTimer: function() {
		clearInterval(game.myTimer);
        $("#timeLeft").html(0);
	},

	winGame: function() {
		// increase Wins count by one
		this.winsCount += 1;
		$("#winsCount").html(this.winsCount);
		// announce you won
		$("#displayAnnounce").html("You're a wizard Harry!");
		// highlight correct answer
        this.highlightAnswer();
		// start new question with 2 second delay
		setTimeout(function(){
            game.newQuestion();
        }, 2000);
	},

	loseGame: function() {
		// increase Loses count by one
		this.losesCount += 1;
		$("#losesCount").html(this.losesCount);
		// announce you lost
		$("#displayAnnounce").html("Whomp whomp!");
        // highlight correct answer
        this.highlightAnswer();
		// start new question with 2 second delay
		setTimeout(function(){
            game.newQuestion();
        }, 2000);
	},

	outOfTime: function() {
		// increase Loses count by one
		this.losesCount += 1;
		$("#losesCount").html(this.losesCount);
		// announce out of time
        $("#displayAnnounce").html("Out of time!");
        this.clearTimer();
        // highlight correct answer
        this.highlightAnswer();
        // start new question with 2 second delay
        setTimeout(function(){
            game.newQuestion();
        }, 2000);
	},	
    
    highlightAnswer: function() {
        // select choices that are available
        choices = $("#answerChoices").children();
        // highlight the correct answer
        choices.each(function() {
        	console.log($(this).html());
        	if ($(this).html() === game.currentAns) {
        		$(this).addClass("correctAns");
        	}
        });
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
    question: "What's Professor Trelawney's former husband's last name?",
    answer: "Higglebottom",
    options: ["Stroker", "Peucey", "Higglebottom", "Nigglemeyer"]
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
    options: ["Make him angry", "Cause him pain", "Make him cough", "Make him sneeze"]
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
  {
    question: "What does Molly like Arthur to call her in private?",
    answer: "Mollywobbles",
    options: ["Dearest", "Mollybabe", "Mollywobble", "Honey"]
  },
  {
    question: "How many languages has the Harry Potter book series been translated into?",
    answer: "67",
    options: ["67", "45", "39", "72"]
  },
  {
    question: "How many times was Celetina Warbeck married?",
    answer: "3",
    options: ["5", "3", "1", "8"]
  },
  {
    question: "What did Professor Quirrel teach before Defense Against the Dark Arts?",
    answer: "Muggle Studies",
    options: ["Ancient Runes", "Divination", "Muggle Studies", "Alchemy"]
  },
  {
    question: "What form does Rita Skeeter take as an Animagus?",
    answer: "Beetle",
    options: ["Squirrel", "Mouse", "Beetle", "Bird"]
  },
  {
    question: "What is Harry Potter's birthday?",
    answer: "July 31",
    options: ["May 31", "July 30", "July 31", "August 1"]
  },
  {
    question: "What is Hermoine Granger's middle name?",
    answer: "Jean",
    options: ["Jane", "Jean", "Joan", "Jeannie"]
  },
  {
    question: "Which Hogwarts house was Gilderoy Lockhart in?",
    answer: "Ravenclaw",
    options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
  },
  {
    question: "How many victims were petrified by the Basilisk in Chamber of Secrets?",
    answer: "Six",
    options: ["Five", "Six", "Seven", "Nine"]
  },
  {
    question: "What is Moaning Myrtle's surname?",
    answer: "Warren",
    options: ["Jones", "Warren", "Mitchell", "Smith"]
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
    if(game.firstClick === true) {
        game.firstClick = false;
        // store user choice
        var userChoice = $(this).text();
        console.log("User choice: " + userChoice);
        // check if user guess is correct
        for (var i=0; i < availableQuestions.length; i++) {
            if (userChoice === questionObj.answer) {
                // user wins
                game.clearTimer();
                game.winGame();
                return
            } else {
            	// highlight user choice
        		$(this).addClass("selectedAns");
                // user loses
                game.clearTimer();
                game.loseGame();
                return
            }
        }
    };
});
