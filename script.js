const words = {
    teams: ["rangers", "bruins", "canadiens", "flyers", "blackhawks"],
    players: ["gretzky", "lemieux", "ovechkin", "mcdavid", "crosby"],
    terms: ["powerplay", "faceoff", "hat-trick", "penalty", "slapshot"],
    jagr: ["jagr", "penguins", "khl", "czech", "mullets"]
};

let chosenWord = "";
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let wins = 0;
let losses = 0;

// Tally system
let gamesPlayed = 0;
let totalGuessed = 0;
let totalCorrect = 0;
let totalTries = 0;

function startGame(category) {
    chosenWord = words[category][Math.floor(Math.random() * words[category].length)];
    guessedLetters = Array(chosenWord.length).fill("_");
    wrongLetters = [];
    gamesPlayed++;
    updateStats();

    document.getElementById("difficultySelection").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    updateWordDisplay();
    document.getElementById("wrongLetters").textContent = "";
    document.getElementById("message").textContent = "";
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
}

function updateStats() {
    document.getElementById("gamesPlayed").textContent = gamesPlayed;
    document.getElementById("totalGuessed").textContent = totalGuessed;
    document.getElementById("totalCorrect").textContent = totalCorrect;
    document.getElementById("totalTries").textContent = totalTries;
}

function resetGame() {
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("difficultySelection").style.display = "block";
}
