// Initializing the variables
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let randomChosenColour;
let started = false;

// Button colors array
const buttonColours = ["red", "blue", "green", "yellow"]

// Change the initial header text and start the game
$(document).on("keypress", function(){
    if(!started){
        nextSequence();
        $("h1").text(`Level ${level}`)
        started = true;
    }
});

// Next sequence function
const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`)
    // Random Number
    let randomNumber = Math.floor(Math.random() * 4);
    // Random Chosen color
    randomChosenColour = buttonColours[randomNumber];
    // add random color to game pattern
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// add effects to the clicked button
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
});


// Animate the button clicked
const animatePress = (item) => {
    $(`#${item}`).addClass("pressed")
    setTimeout(function () {
        $(`#${item}`).removeClass("pressed");
        }, 100);
};

// Check the answer 
const checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);    
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text(`Game Over, Press any key to restart`)
        startOver();
    }
}

// Start the game over
const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
}

// Play the button sound
const playSound = (name) => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};
// Play the background sound when the window has loaded
const playBackgroundSound = (name) => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
    audio.loop = true;
};
playBackgroundSound("background");