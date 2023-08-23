var userPattern = [];
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var level = 0;
var toggle = 1;

function Playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    Playsound(randomChosenColor);
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(index) {

    if (gamePattern[index] === userPattern[index]) {
        if (gamePattern.length == userPattern.length) {
            setInterval(nextSequence(), 1000);
            userPattern = [];
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3")
        userPattern = [];
        gamePattern = [];

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        toggle = 1;
        level = 0;
    }
}

$(".btn").on("click", function (event) {
    var userChosen = event.target.id;
    userPattern.push(userChosen);
    console.log(userPattern);
    animatePress(userChosen);
    Playsound(userChosen);
    checkAnswer(userPattern.length - 1);
});

$(document).on("keypress", function () {
    if (toggle != 0) {
        toggle = 0;
        nextSequence();
    }
});

