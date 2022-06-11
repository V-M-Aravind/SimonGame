const RESTART_CONTENT = "Press A Key to Re Start";
const COLOURS = ["green", "red", "yellow", "blue"];
let totalScore;
let currentScoreIndex;
let level;
const levelTitle = document.querySelector("#level-title");
const body = document.querySelector("body");

const computerPlay = () => {
  if (level === 0) {
    levelTitle.innerHTML = `LEVEL 1`;
    level++;
    document.removeEventListener("keypress", computerPlay);
  }
  const colourValue = Math.floor(Math.random() * 4);
  const colour = COLOURS[colourValue];
  const colourElement = document.querySelector("#" + colour);
  colourElement.classList.add("visibility-hidden");
  const audio = new Audio("../sounds/" + colour + ".mp3");
  audio.play();
  totalScore.push(colour);
  setTimeout(() => {
    colourElement.classList.remove("visibility-hidden");
  }, 300);
};
const init = () => {
  body.classList.contains("game-over")
    ? body.classList.remove("game-over")
    : "";
  totalScore = [];
  level = 0;
  currentScoreIndex = 0;
  document.addEventListener("keypress", computerPlay);
};
init();
const checkStatus = (colour) => {
  if (colour === totalScore[currentScoreIndex]) {
    currentScoreIndex++;
    if (currentScoreIndex === totalScore.length) {
      level++;
      currentScoreIndex = 0;
      setTimeout(() => {
        levelTitle.innerHTML = `LEVEL ${level}`;
        computerPlay();
      }, 700);
    }
  } else {
    setTimeout(() => {
      const audio = new Audio("../sounds/wrong.mp3");
      audio.play();
      levelTitle.innerHTML = RESTART_CONTENT;
      body.classList.add("game-over");
      setTimeout(() => {
        init();
      }, 300);
    }, 200);
  }
};
const playerPlay = (event) => {
  const colour = event.currentTarget.id;
  const audio = new Audio("../sounds/" + colour + ".mp3");
  const colourElement = document.querySelector("#" + colour);
  colourElement.classList.add("pressed");
  audio.play();
  setTimeout(() => {
    colourElement.classList.remove("pressed");
  }, 200);
  checkStatus(colour);
};
const colourElements = document.querySelectorAll(".btn");
for (let index = 0; index < colourElements.length; index++) {
  colourElements[index].addEventListener("click", playerPlay);
}
