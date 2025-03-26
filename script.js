let words = {
    easy: [
        { word: "puck", hint: "Small rubber disc used in hockey" },
        { word: "goal", hint: "You need this to score points" },
        { word: "cezch", hint: "where the great 68 is from " },
        { word: "assit", hint: "get some apples" }
    ],
    hard: [
        { word: "slapshot", hint: "A powerful hockey shot" },
        { word: "bardown", hint: " I always go _______" },
        { word: "breakaway", hint: "A player gets ahead with no defenders" },
        { word: "mullet", hint: "best hair in the world / sal and drew" }
    ]
};

let selectedWordObj = {};
let guessedLetters = [];
let tries = 0;
let gamesPlayed = 0;
let correctLetters = 0;
let wrongLetters = 0;

function startGame(difficulty) {
    selectedWordObj = words[difficulty][Math.floor(Math.random() * words[difficulty].length)];
    guessedLetters = [];
    tries = 0;
    document.getElementById("wordDisplay").innerText = "_ ".repeat(selectedWordObj.word.length).trim();
    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("hintText").innerText = "Click 'Hint' if you need help!";
    updateStats();
}

function guessLetter() {
    let letterInput = document.getElementById("letterInput");
    let letter = letterInput.value.toUpperCase();
    
    if (letter && !guessedLetters.includes(letter) && letter.match(/[A-Z]/)) {
        guessedLetters.push(letter);
        tries++;

        if (selectedWordObj.word.toUpperCase().includes(letter)) {
            correctLetters++;
        } else {
            wrongLetters++;
        }

        updateDisplay();
        updateStats();
        letterInput.value = "";
    }
}

function getHint() {
    document.getElementById("hintText").innerText = "Hint: " + selectedWordObj.hint;
}

function updateDisplay() {
    let displayWord = selectedWordObj.word.toUpperCase().split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
    document.getElementById("wordDisplay").innerText = displayWord;
}

function updateStats() {
    document.getElementById("gamesPlayed").innerText = gamesPlayed;
    document.getElementById("lettersGuessed").innerText = guessedLetters.length;
    document.getElementById("correctLetters").innerText = correctLetters;
    document.getElementById("wrongLetters").innerText = wrongLetters;
}
