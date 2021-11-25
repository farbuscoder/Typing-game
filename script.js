console.log("Hola mundo");

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//List of words for game:

const url = "https://random-word-api.herokuapp.com/word?number=100";

fetch(url)
  .then((response) => response.json())
  .then((data) => wordsArray(data));

//Words array

let words;

function wordsArray(data) {
  let words = data;

  // Init word:
  let randomWord;

  //Init score:
  let score = 0;

  //Init time
  let time = 10;

  //Set Difficulty to value in ls or medium

  let difficulty =
    localStorage.getItem("difficulty") !== null
      ? localStorage.getItem("difficulty")
      : "medium";

  //Set difficulty select value:

  difficultySelect.value =
    localStorage.getItem("difficulty") !== null
      ? localStorage.getItem("difficulty")
      : "medium";

  //Focus on text on start:

  text.focus();

  // Start counting down:

  const timeInterval = setInterval(updateTime, 1000);

  //Generate random word from array:
  function getRandomWord() {
    console.log(words);
    return words[Math.floor(Math.random() * words.length)];
  }

  //Add word to Dom
  function addWordtoDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }

  //Update score

  function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }

  // Update Time:

  function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time === 0) {
      clearInterval(timeInterval);

      //End game
      gameOver();
    }
  }

  //Game over, show end screen:

  function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = "flex";
  }

  addWordtoDOM();

  //Event listeners:

  //Typing:
  text.addEventListener("input", (e) => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
      addWordtoDOM();
      updateScore();

      //Clear
      e.target.value = "";

      if (difficulty === "hard") {
        time += 2;
      } else if (difficulty === "medium") {
        time += 3;
      } else {
        time += 5;
      }

      updateTime();
    }
  });

  //Settings btn click

  settingsBtn.addEventListener("click", () =>
    settings.classList.toggle("hide")
  );

  //Settings select:

  settingsForm.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
  });
}
