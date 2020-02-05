/*jshint esversion: 6 */

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let started = false;

$(document).keypress(function (event) {
  if(!started) {
    started = true;
    // $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function () {
  let btnClicked = $(this).attr("id");
  playSound(btnClicked);
  animatePress(btnClicked);
  userClickPattern.push(btnClicked);
  checkAnswer(userClickPattern.length - 1);
});

// Helper functions

function nextSequence() {
  userClickPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 150);
}

function checkAnswer(currentLevel) {
  if(userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(gamePattern.length === userClickPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
