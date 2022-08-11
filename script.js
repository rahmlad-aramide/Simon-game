// Initializing the variables
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let randomChosenColour;
let started = false;

// Button colors array
const buttonColours = ["red", "blue", "green", "yellow"]

// Change the initial header text and start the game
$("#start").on("click", function(){
    if(!started){
        nextSequence();
        $("#level-title").text(`Level ${level}`)
      $("#start").css("display", "none"); 
        started = true;
    }
});
    
// Next sequence function
const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`)
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
    $("#level-title").text(`Game Over, restart game`); 
      setTimeout(() => {
        $("#welcome").text(`Simon Game V.2.0 🚀`);   
      }, 2000);  
      startOver();
    }
}

// Start the game over
const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
  if(!started){
  $("#start").text("Restart")
  $("#start").css("display", "block");
  $("#welcome").text("Wrong button, pls restart 😥")
}
}

// Play the button sound
const playSound = (name) => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};
