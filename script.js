let words = {
    easy: [
        { word: "pittsburgh", hint: "Jágr's first NHL team." },
        { word: "hat trick", hint: "3 at a time." },
        { word: "goal", hint: "Jágr scored over 766 of these in the NHL." }
    ],
    hard: [
        { word: "stanleycup", hint: "Jágr won this twice with the Penguins." },
        { word: "mullet", hint: "The best haircut out there." },
        { word: "czechoslovakia", hint: "Jágr's birthplace before it split into two nations." }
    ]
};

let currentWord = "";
let guessedLetters = [];
let correctLetters = 0;
let wrongLetters = 0;
let gamesPlayed = 0;
let currentDifficulty = "";

function startGame(difficulty) {
    currentDifficulty = difficulty;
    let wordObj = words[difficulty][Math.floor(Math.random() * words[difficulty].length)];
    currentWord = wordObj.word;
    guessedLetters = [];
    correctLetters = 0;
    wrongLetters = 0;
    gamesPlayed++;

    document.getElementById("wordDisplay").innerText = "_ ".repeat(currentWord.length).trim();
    document.getElementById("hintText").innerText = "Ask for a hint";
    document.getElementById("gamesPlayed").innerText = gamesPlayed;
    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("difficultySelection").classList.add("hidden");
    document.getElementById("message").innerText = "";
}

function guessLetter() {
    let input = document.getElementById("letterInput").value.toLowerCase().trim();
    if (!input || guessedLetters.includes(input) || input.length !== 1) return;

    guessedLetters.push(input);
    
    if (currentWord.includes(input)) {
        correctLetters++;
    } else {
        wrongLetters++;
    }

    updateStats();
    updateDisplay();
}

function updateStats() {
    document.getElementById("correctLetters").innerText = correctLetters;
    document.getElementById("wrongLetters").innerText = wrongLetters;
    document.getElementById("guessedLetters").innerText = guessedLetters.join(", ");
}

function updateDisplay() {
    let displayWord = currentWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
    document.getElementById("wordDisplay").innerText = displayWord;

    if (!displayWord.includes("_")) {
        document.getElementById("winner").classList.remove("hidden");
        document.getElementById("gameArea").classList.add("hidden");
    }
}

function getHint() {
    let wordObj = words[currentDifficulty].find(w => w.word === currentWord);
    document.getElementById("hintText").innerText = wordObj ? wordObj.hint : "No hint available.";
}

function resetGame() {
    location.reload();
}
