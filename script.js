var timer;

var secondsLeft = 0;

var score = 0;

var currentQuestion = -1;

function start() {

    secondsLeft = 75;

    document.getElementById("secondsLeft").innerHTML = secondsLeft;
    timer = setInterval(function() {

        secondsLeft--;

        document.getElementById("secondsLeft").innerHTML = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timer);
            finishQuiz(); 
        }
    }, 1000);

    next();
}


function next() {

    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        finishQuiz();
        return;
    }

    var quizInfo = "<h5>" + questions[currentQuestion].title + "</h5>"
    for (var questionLoop = 0; questionLoop < questions[currentQuestion].choices.length; questionLoop++) {

        var playerPick = "<button onclick=\"[Answer]\">[Choice]</button>"; 
        playerPick = playerPick.replace("[Choice", questions[currentQuestion].choices[questionLoop]);

        if (questions[currentQuestion].choices[questionLoop] == questions[currentQuestion].answer) {
            playerPick = playerPick.replace("[Answer]", "correct()");
        } else {
            playerPick = playerPick.replace("[Answer]", "incorrect()");
        }
        quizInfo += playerPick
    }
    document.getElementById("quizMain").innerHTML = quizInfo
}


function correct() {
    score += 20;
    next();
}
   
function incorrect() {
    secondsLeft -= 15; 
    next();
}


function finishQuiz() {

    clearInterval(timer);

    var quizInfo = `
    <h5>Quiz Complete</h5>
    <h6>Your score was ` + score + ` </h6>
    <input type="text" id="name" placeholder="intials"> 
    <button onclick = "setScore()" >Set score!</button>`;

    document.getElementById("quizMain").innerHTML = quizInfo;
}

function setScore() {

    localStorage.setItem("playerIntials",  document.getElementById('name').value);
    
    localStorage.setItem("highscore", score);

    getScore();
}


function getScore() {

    var quizInfo = `  
    <h5>` + localStorage.getItem("playerIntials") + ` highest score is:</h5>
    <h6>` + localStorage.getItem("highscore") + `</h6> 
    <br>
    
    
    <button onclick = "clearScore()" >Clear score</button><button onclick = "restartQuiz()" >Start again</button>
    
    `;

    document.getElementById("quizMain").innerHTML = quizInfo;
};

function clearScore() {

    localStorage.setItem("playerIntials",  "");

    localStorage.setItem("highscore", "");


    restartQuiz();
}

function restartQuiz() {
    
    clearInterval(timer);

    timer = null;

    secondsLeft = 0;

    score = 0;

    currentQuestion = -1;
  

    document.getElementById("timeRemaining").innerHTML = secondsLeft;

        var quizInfo = `
        <h1>Test your coding knowledge</h1>
        <p> This quiz starts with a 75 second timer. Answer 5 questions, each worth 20 points.
        Click the start button to begin</p>
        <p> Incorrect answers will decrease the timer by 15</p>
        <button onclick ="start()">Start!</button>`;

        document.getElementById("quizMain").innerHTML = quizInfo;
}
