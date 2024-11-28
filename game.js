const diceQuestions = [
    [18, "+", [1, 2, 10, 6, 20]],
    [4, "+", [4, 1, 9, 2, 11]],
    [3, "+", [9, 1, 12, 2, 2]],
    [6, "+", [3, 2, 8, 4, 9]],
    [6, "+", [1, 2, 2, 12, 9]],
    [14, "+", [7, 9, 2, 9, 1]],
    [5, "+", [2, 3, 4, 8, 9]],
    [12, "+", [12, 9, 2, 2, 1]],
    [11, "+", [5, 4, 7, 3, 1]],
    [18, "+", [1, 2, 4, 9, 11]],
]


const numpadQuestions = [
    ["exampleQuery", 33]
]

const pointsSpan = document.querySelector(".points")

let points = 0

async function processQuestions() {
    let first = true;
    for (const question of diceQuestions) {
        goalNumber = question[0];
        operator = question[1];
        values = question[2];

        console.log("Setting up question:", goalNumber, operator, values);

        if (first) {
            firstTime = true;
            await createDiceQuestion();
            first = false;
        } else {
            firstTime = false;
            await createDiceQuestion();
        }

        pointsSpan.innerHTML = "Points: " + points;

        console.log("Finished question:", goalNumber);
    }
    console.log("All questions processed!");
}


processQuestions()