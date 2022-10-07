let game = document.querySelector(".game");
let mode = document.querySelectorAll(".mode");
let modeType = document.querySelector("#mode");
let modeTime = document.querySelector("#mode-time");
let startButton = document.querySelector("button");
let theWord = document.querySelector(".the-word");
let input = document.querySelector("#input");
let allWords = document.querySelector(".words");
let timeCounter = document.querySelector(".counter");
let yourScore = document.querySelector(".your-score");
let totalScore = document.querySelector(".total-score");
let modesBox = document.querySelector(".type");
let playCount = document.querySelector(".play-count");
let sentence = document.querySelector(".sentence");
let progressBar = document.querySelector(".progress-bar");
let bar = document.querySelector(".bar");

//to avoid cheating by copy and paste
input.onpaste = () => {
  return false;
};

// for dates
let arr;

if (window.localStorage.dates) {
  arr = JSON.parse(window.localStorage.dates);
} else {
  arr = [];
}
playCounts();

let modes = {
  Easy: 5,
  Normal: 4,
  Hard: 6,
};

let easy = [
  "fun",
  "play",
  "love",
  "joy",
  "meow",
  "luck",
  "work",
  "job",
  "realm",
  "good",
  "bad",
  "cute",
  "nice"
];

let normal = [
  "static",
  "tryhard",
  "saturn",
  "firrari",
  "samsung",
  "iphone",
  "huwawi",
  "nokia",
  "programming",
  "college",
  "leetcode",
];

let hard = [
  "intermidiate",
  "beautiful",
  "wonderful",
  "waterfall",
  "limited",
  "inhibited",
  "resurrection",
  "playstation",
  "clashing",
  "thousands",
  "university",
  "hardworker",
];

let words = normal;

let chosenModeCount = 4;
let chosenMod = "Normal";
mode.forEach((e) => {
  e.onclick = () => {
    mode.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
    modeType.innerHTML = e.innerHTML;
    chosenMod = e.innerHTML;
    modeTime.innerHTML = modes[e.innerHTML];
    timeCounter.innerHTML = modes[e.innerHTML];
    chosenModeCount = modes[e.innerHTML];
    words =
      e.innerHTML === "Easy" ? easy : e.innerHTML === "Normal" ? normal : hard;
    totalScore.innerHTML = words.length;
  };
});

totalScore.innerHTML = words.length;

let firstClick = 0;
let winGame = false;

startButton.onclick = () => {
  startGame();
};

document.onkeyup = (e) => {
  if (e.key === " ") {
    startGame();
  }
};

function startGame() {
  firstClick++;

  //actions
  actionsOnPlay();

  //lock the modes
  hideModes();

  // reset button
  resetGame();

  let time = setInterval(() => {
    if (firstClick === 1) {
      timeCounter.innerHTML = +timeCounter.innerHTML + 3;
      firstClick++;
    }
    timeCounter.innerHTML--;
    if (timeCounter.innerHTML > 0) {
      if (input.value === theWord.innerHTML) {
        input.style.border = "3px solid #00E0C6";
        if (words.length > 0) {
          generateRandomWord();
          input.value = "";
          timeCounter.innerHTML = chosenModeCount;
          yourScore.innerHTML++;
          bar.style.width = `${
            (yourScore.innerHTML * 100) / totalScore.innerHTML
          }%`;
        } else {
          clearInterval(time);
          yourScore.innerHTML++;
          yourScore.style.color = "red";
          bar.style.width = "100%";
          CongratzMessage();
          winGame = true;
          date(winGame);
          playCounts();
          bar.style.backgroundColor = "#00E0C6";
        }
      } else {
        input.style.border = "3px solid red";
      }
    } else {
      clearInterval(time);
      gameoverMessage(yourScore.innerHTML);
      timeCounter.style.color = "red";
      bar.style.backgroundColor = "red";
      date(winGame);
      playCounts();
    }
  }, 1000);
}

function actionsOnPlay() {
  startButton.remove();
  sentence.remove();
  generateRandomWord();
  input.style.display = "block";
  input.focus();
  allWords.style.display = "flex";
  progressBar.style.display = "block";
}

function hideModes() {
  modesBox.innerHTML = "";
  let Mode = document.createElement("span");
  Mode.className = "chosen";
  let ModeText = document.createTextNode(
    chosenModeCount === 4 ? "Normal" : chosenModeCount === 5 ? "Easy" : "Hard"
  );
  Mode.appendChild(ModeText);
  modesBox.appendChild(Mode);
}

function generateRandomWord() {
  let randomWord = words[Math.trunc(Math.random() * words.length)];
  let indexOfRandomWord = words.indexOf(randomWord);
  words.splice(indexOfRandomWord, 1);

  theWord.innerHTML = randomWord;
  allWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let span = document.createElement("span");
    let spanText = document.createTextNode(words[i]);
    span.appendChild(spanText);
    allWords.appendChild(span);
  }
}

function CongratzMessage() {
  let congratzMessage = document.createElement("div");
  congratzMessage.className = "congratz";
  let congratzMessageText = document.createTextNode(
    `Congratulation you have done it on ${chosenMod} mode`
  );
  congratzMessage.appendChild(congratzMessageText);
  game.appendChild(congratzMessage);
}

function gameoverMessage(score) {
  let gameoverMessage = document.createElement("div");
  gameoverMessage.className = "gameover";
  let gameoverMessageText = document.createTextNode(
    `GameOver your score is ${score} / ${totalScore.innerHTML}`
  );
  gameoverMessage.appendChild(gameoverMessageText);
  game.appendChild(gameoverMessage);
}

function resetGame() {
  let resetButton = document.createElement("span");
  resetButton.className = "reset";
  let resetButtonText = document.createTextNode("Reset Game");
  resetButton.appendChild(resetButtonText);
  modesBox.appendChild(resetButton);
  resetButton.onclick = () => {
    window.location.reload();
  };
}

function date(condition) {
  let dateObj = {
    date: new Date(),
    win: condition,
    mode: chosenMod
  };

  arr.push(dateObj);
  localStorage.dates = JSON.stringify(arr);
}

function playCounts() {
  playCount.innerHTML = arr.length;
}

