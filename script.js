// 5. Game pattern
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

// 3. Button colors array
const buttonColours = ["red", "blue", "green", "yellow"]
let started = false;

// 1. Next sequence function
const nextSequence = () => {
    // 2. Random Number
    let randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber)
    // 4. Random Chosen color
    let randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    animatePress(randomChosenColour);
    // 6. add randome color to game pattern
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text(`Level ${level}`)
}
$(document).on("keypress", function(){
    if(!started){
        nextSequence();
        $("h1").text(`Level ${level}`)
        started = true;
    }
});
// $(document).on("keypress", alert("Pressed"));


function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    console.log(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    $(`#${userChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
});

function animatePress(item) {
    $(`#${item}`).addClass("pressed")
    setTimeout(function () {
        $(`#${item}`).removeClass("pressed");
        }, 100);

}
