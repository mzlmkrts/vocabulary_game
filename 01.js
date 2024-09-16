// JavaScript
const wordPairs = {
    "the apple": "der Apfel",
    "the banana": "die Banane",
    "the car": "das Auto",
    "the dog": "der Hund",
    "the cat": "die Katze",
    "the house": "das Haus",
    "the man": "der Mann",
    "the woman": "die Frau",
    "the child": "das Kind",
    "the girl": "das Mädchen",
    "the boy": "der Junge",
    "the water": "das Wasser",
    "the milk": "die Milch",
    "the bread": "das Brot",
    "the cheese": "der Käse",
    "the coffee": "der Kaffee",
    "the tea": "der Tee",
    "the juice": "der Saft",
    "the beer": "das Bier",
    "the wine": "der Wein",
    "the table": "der Tisch",
    "the chair": "der Stuhl",
    "the bed": "das Bett",
    "the room": "das Zimmer",
    "the door": "die Tür",
    "the window": "das Fenster",
    "the street": "die Straße",
    "the city": "die Stadt",
    "the country": "das Land",
    "the mountain": "der Berg",
    "the river": "der Fluss",
    "the lake": "der See",
    "the sea": "das Meer",
    "the tree": "der Baum",
    "the forest": "der Wald",
    "the flower": "die Blume",
    "the garden": "der Garten",
    "the park": "der Park",
    "the animal": "das Tier",
    "the bird": "der Vogel",
    "the fish": "der Fisch",
    "the cow": "die Kuh",
    "the horse": "das Pferd",
    "the pig": "das Schwein",
    "the sheep": "das Schaf",
    "the goat": "die Ziege",
    "the chicken": "das Huhn",
    "the egg": "das Ei",
    "the sun": "die Sonne",
    "the moon": "der Mond",
    "the star": "der Stern",
    "the sky": "der Himmel",
    "the cloud": "die Wolke",
    "the rain": "der Regen",
    "the snow": "der Schnee",
    "the weather": "das Wetter",
    "the wind": "der Wind",
    "the storm": "der Sturm",
    "the book": "das Buch",
    "the letter": "der Brief",
    "the newspaper": "die Zeitung",
    "the pen": "der Stift",
    "the paper": "das Papier",
    "the picture": "das Bild",
    "the photo": "das Foto",
    "the camera": "die Kamera",
    "the computer": "der Computer",
    "the phone": "das Telefon",
    "the television": "der Fernseher",
    "the radio": "das Radio",
    "the clock": "die Uhr",
    "the time": "die Zeit",
    "the hour": "die Stunde",
    "the minute": "die Minute",
    "the second": "die Sekunde",
    "the school": "die Schule",
    "the university": "die Universität",
    "the student": "der Student",
    "the teacher": "der Lehrer",
    "the class": "die Klasse",
    "the lesson": "die Stunde",
    "the test": "der Test",
    "the exam": "die Prüfung",
    "the question": "die Frage",
    "the answer": "die Antwort",
    "the homework": "die Hausaufgabe",
    "the exercise": "die Übung",
    "the problem": "das Problem",
    "the solution": "die Lösung",
    "the language": "die Sprache",
    "the word": "das Wort",
    "the sentence": "der Satz",
    "the name": "der Name",
    "the friend": "der Freund",
    "the family": "die Familie",
    "the father": "der Vater",
    "the mother": "die Mutter",
    "the brother": "der Bruder",
    "the sister": "die Schwester",
    "the son": "der Sohn",
    "the daughter": "die Tochter",
    "the baby": "das Baby",
    "the grandmother": "die Großmutter",
    "the grandfather": "der Großvater",
    // ... add more word pairs here
};


let currentWord = getRandomWord();
let correctCount = 0;
let incorrectCount = 0;
let questionsAsked = 0;
let timer;
let timeLeft = 30; // 30 seconds for each question

document.getElementById("question").innerText = `${currentWord}`;
updateScore();
startTimer();

// Listen for enter key press in the input field
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action
        checkTranslation(); // Call the check translation function
    }
});

function getRandomWord() {
    const keys = Object.keys(wordPairs);
    return keys[Math.floor(Math.random() * keys.length)];
}

function updateScore() {
    document.getElementById("score").innerText = `Correct: ${correctCount}, Incorrect: ${incorrectCount}, Questions Asked: ${questionsAsked}`;
}

function startTimer() {
    timeLeft = 30; // Reset time for each new question
    document.getElementById("timer").innerText = `Time left: ${timeLeft} seconds`;

    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkTranslation(true);
        }
    }, 1000);
}

function checkTranslation(timeUp = false) {
    if (incorrectCount >= 5) {
        document.getElementById("gameOver").innerText = "Game Over! You reached 5 incorrect answers.";
        clearInterval(timer);
        return; // Game over, no more checks
    }

    clearInterval(timer); // Stop the timer as the user has answered

    const userTranslation = document.getElementById("userInput").value.toLowerCase();
    questionsAsked++;

    const resultElement = document.getElementById("result");
    if (!timeUp && userTranslation === wordPairs[currentWord].toLowerCase()) {
        correctCount++;
        resultElement.innerText = "Correct!";
        resultElement.className = "correct";
    } else {
        incorrectCount++;
        resultElement.innerText = timeUp ? "Time's up! " : "Incorrect! ";
        resultElement.innerText += `The correct translation of '${currentWord}' is '${wordPairs[currentWord]}'.`;
        resultElement.className = "incorrect";

        
    }

    updateScore();

    // Prepare for the next question
    currentWord = getRandomWord();
    document.getElementById("question").innerText = `${currentWord}`;
    document.getElementById("userInput").value = ""; // Clear the input field
    startTimer(); // Start the timer for the next question
}
