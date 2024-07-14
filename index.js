var level = 0;
var levelHTML = document.querySelector("#level-title");
var buttons = document.querySelectorAll(".btn");
var background = document.querySelector("body");
var colors = ["green", "red", "yellow", "blue"];
var isGameStarted = false;
var buttonColor = "";
var num;
var nums = [];
var i = 0;

function updateLevel() {
  i = 0;
  level++;
  num = Math.floor(Math.random() * 4);
  nums.push(num);
  console.log(nums);
  pressedButton(colors[num]);
  levelHTML.innerHTML = "Level " + level;
}

function startGame() {
  level = 0;
  isGameStarted = true;
  updateLevel();
}

function checkButton() {
  console.log(colors[nums[i]]);
  if (buttonColor == colors[nums[i]]) {
    if (i == nums.length - 1) {
      setTimeout(function () {
        updateLevel();
      }, 800);
    }
  } else {
    gameOver();
  }
  i++;
}

function gameOver() {
  levelHTML.innerHTML = "Game Over, Press Any Key to Restart";
  isGameStarted = false;
  i = 0;
  var music = new Audio("./sounds/wrong.mp3");
  music.play();

  background.classList.add("game-over");
  setTimeout(function () {
    background.classList.remove("game-over");
  }, 100);
}

function listenForGameReset() {
  document.addEventListener("keydown", (e) => {
    if (!isGameStarted) {
      startGame();
    }
  });
}

function addSounds() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {
      buttonColor = this.classList[1];
      if (isGameStarted) checkButton();
      pressedButton(buttonColor);
      if (!isGameStarted) gameOver();
    });
  }
}

function pressedButton(buttonColor) {
  var music = new Audio(`./sounds/${buttonColor}.mp3`);
  document.querySelector(`#${buttonColor}`).classList.add("pressed");
  setTimeout(function () {
    document.querySelector(`#${buttonColor}`).classList.remove("pressed");
  }, 100);
  music.play();
}

addSounds();
listenForGameReset();
