let easyWords = ["jagr", "goalhorn ", "salute", "pass","the hair " ,"pitt"];
let hardWords = ["stanleycup", "czechrepublic", "rightwinger", "hockeylegend", "mullet","kladno"];
let chosenWord = "";
let displayWord = "";
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let totalGuessed = 0;
let totalCorrect = 0;
let totalTries = 0;
let gamesPlayed = 0;

function setDifficulty(level) {
    chosenWord = (level === "easy") 
        ? easyWords[Math.floor(Math.random() * easyWords.length)].toUpperCase() 
        : hardWords[Math.floor(Math.random() * hardWords.length)].toUpperCase();

    displayWord = "_ ".repeat(chosenWord.length);
    guessedLetters = [];
    wrongLetters = [];
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("wordDisplay").textContent = displayWord;
    document.getElementById("message").textContent = "Guess a letter!";
    document.getElementById("wrongLetters").textContent = wrongLetters.join(", ");
}

function guessLetter() {
    let input = document.getElementById("letterInput").value.toUpperCase();
    document.getElementById("letterInput").value = "";

    if (!input.match(/[A-Z]/) || guessedLetters.includes(input)) {
        document.getElementById("message").textContent = "Invalid input!";
        return;
    }

    guessedLetters.push(input);
    totalGuessed++;

    if (chosenWord.includes(input)) {
        totalCorrect++;
        let newDisplay = "";
        for (let i = 0; i < chosenWord.length; i++) {
            newDisplay += chosenWord[i] === input ? input + " " : displayWord[i * 2] + " ";
        }
        displayWord = newDisplay;
    } else {
        wrongLetters.push(input);
    }

    totalTries++;
    checkWin();
    updateDisplay();
    updateStats();
}

function submitAnswer() {
    let answer = prompt("Enter your answer:").toUpperCase();
    if (answer === chosenWord) {
        displayWinScreen();
    } else {
        displayLoseScreen();
    }
}

function showHint() {
    alert("Hint: It's related to Jaromír Jágr best of luck ");
}

function checkWin() {
    if (!displayWord.includes("_")) {
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
    gamesPlayed++;
    document.getElementById("winScreen").style.display = "none";
    document.getElementById("loseScreen").style.display = "none";
    updateStats();
}

function updateStats() {
    document.getElementById("gamesPlayed").textContent = gamesPlayed;
}

