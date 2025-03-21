const words = {
    teams: { words: ["rangers", "bruins", "canadiens"], hints: ["New York team", "Boston team", "Montreal team"] },
    players: { words: ["gretzky", "lemieux", "ovechkin"], hints: ["99", "Mario", "Ovi"] },
    terms: { words: ["powerplay", "faceoff", "slapshot"], hints: ["Advantage", "Puck drop", "Hard shot"] },
    jagr: { words: ["jagr", "penguins", "czech"], hints: ["Legend", "Played for Pittsburgh", "Nationality"] }
};

let chosenWord = "";
let hint = "";
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let gamesPlayed = 0;
let totalGuessed = 0;
let totalCorrect = 0;
let totalTries = 0;

function startGame(category) {
    let randomIndex = Math.floor(Math.random() * words[category].words.length);
    chosenWord = words[category].words[randomIndex];
    hint = words[category].hints[randomIndex];
    
    guessedLetters = Array(chosenWord.length).fill("_");
    wrongLetters = [];
    gamesPlayed++;

    document.getElementById("difficultySelection").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    updateWordDisplay();
    document.getElementById("wrongLetters").textContent = "";
    document.getElementById("message").textContent = "";
    document.getElementById("hintDisplay").textContent = "";
}

function updateWordDisplay() {
    document.getElementById("wordDisplay").textContent = guessedLetters.join(" ");
}

function guessLetter() {
    const input = document.getElementById("letterInput").value.toLowerCase();
    document.getElementById("letterInput").value = "";

    if (!input.match(/[a-z]/) || input.length !== 1) {
        alert("Please enter a valid letter.");
        return;
    }

    totalGuessed++;

    if (chosenWord.includes(input)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === input) {
                guessedLetters[i] = input;
                totalCorrect++;
            }
        }
    } else {
        wrongLetters.push(input);
        totalTries++;
    }

    updateStats();
    document.getElementById("wrongLetters").textContent = wrongLetters.join(", ");
    updateWordDisplay();

    checkWinOrLose();
}

function submitAnswer() {
    const answer = document.getElementById("fullAnswerInput").value.toLowerCase();
    document.getElementById("fullAnswerInput").value = "";

    if (answer === chosenWord) {
        guessedLetters = chosenWord.split("");
        updateWordDisplay();
        displayWinScreen();
    } else {
        alert("Incorrect answer! Keep trying.");
        totalTries++;
        updateStats();
    }
}

function getHint() {
    document.getElementById("hintDisplay").textContent = "Hint: " + hint;
}

function checkWinOrLose() {
    if (!guessedLetters.includes("_")) {
        displayWinScreen();
    } else if (wrongLetters.length >= maxAttempts) {
        displayLoseScreen();
    }
}

function displayWinScreen() {
    document.getElementById("winScreen").style.display = "block";
}

function displayLoseScreen() {
    document.getElementById("loseScreen").style.display = "block";
    document.getElementById("correctWord").textContent = chosenWord;
}

function resetGame() {
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("loseScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("difficultySelection").style.display = "block";

    updateStats();
}

function updateStats() {
    document.getElementById("gamesPlayed").textContent = gamesPlayed;
    document.getElementById("totalGuessed").textContent = totalGuessed;
    document.getElementById("totalCorrect").textContent = totalCorrect;
    document.getElementById("totalTries").textContent = totalTries;
}

