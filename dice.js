const diceContainerModel = document.querySelector(".dice-container-model")
const generalContainer = document.querySelector(".general-container")



const operatorColors = {
    "+": "rgb(255, 185, 54)",
    "-": "rgb(58, 94, 255)",
    "*": "rgb(255, 0, 0)",
    "/": "rgb(0, 255, 21)"
};

const operatorPoints = {
    "+": 1,
    "-": 2,
    "*": 1,
    "/": 3
};

// Define an asynchronous function
async function createDiceQuestion(goalNumber, operator, values) {
    return new Promise((resolve) => {
        const diceContainer = diceContainerModel.cloneNode(true);
        diceContainer.classList.replace("dice-container-model", "dice-container");
        diceContainer.style.display = "block";

        generalContainer.appendChild(diceContainer);

        const numberContainers = diceContainer.querySelectorAll(".number");
        const operatorContainers = diceContainer.querySelectorAll(".operator");
        const goalTd = diceContainer.querySelector(".goal-td");
        const resetButton = diceContainer.querySelector(".reset-button")
        const restartButton = diceContainer.querySelector(".restart-button");
        const pointsSpan = document.querySelector(".points")

        let firstNumberI = null;
        let secondNumberI = null;

        let currentOperator = "+"; // Avoid conflict with parameter `operator`
        operatorClick(0); // Default to the +

        // Display goal and numbers
        goalTd.innerHTML = goalNumber;
        numberContainers.forEach((container, index) => {
            container.innerHTML = values[index];
        });

        // Interaction functions
        function operatorClick(index) {
            const newOperator = ["+", "-", "*", "/"][index];
            const newOperatorContainer = operatorContainers[index];

            // Reset old operator styles
            const oldOperatorContainer =
            operatorContainers[["+", "-", "*", "/"].indexOf(currentOperator)];
            oldOperatorContainer.style.backgroundColor = operatorColors[currentOperator];
            oldOperatorContainer.style.color = "white";

            // Set new operator styles
            newOperatorContainer.style.backgroundColor = "rgb(100, 100, 100)";
            newOperatorContainer.style.color = operatorColors[newOperator];

            //play lil sound
            if (currentOperator != newOperator) { //do not play in the first instance
                operatorClickSound.play();
            }
            

            currentOperator = newOperator;
        }

        function numberClick(index) {
            const indexContainer = numberContainers[index];

            // Skip empty cells
            if (indexContainer.innerText === "") {
                return;
            }

            numberClickSound.play();

            if (firstNumberI === null) {
                firstNumberI = index;
                console.log("1st: " + index);
                indexContainer.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            } else if (secondNumberI === null && index !== firstNumberI) {
                secondNumberI = index;
                console.log("2nd: " + index);
                indexContainer.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                makeOperation();
            }
        }

        // Backend functions
        function eraseNumbers() {
            numberContainers.forEach(container => {
                container.style.background = "transparent"
            })
            

            firstNumberI = null;
            secondNumberI = null;
        }

        function makeOperation() {
            const firstNumberV = parseInt(numberContainers[firstNumberI].innerText);
            const secondNumberV = parseInt(numberContainers[secondNumberI].innerText);

            const resultNumber = Math.abs(eval(`${firstNumberV} ${currentOperator} ${secondNumberV}`));


            const firstNumberContainer = numberContainers[firstNumberI];
            const secondNumberContainer = numberContainers[secondNumberI];

            // Check if result is valid
            if (resultNumber % 1 !== 0) {
                
                
                illegalSound.play()
                firstNumberContainer.style.backgroundColor = "rgba(255, 100, 100, 0.3)"
                secondNumberContainer.style.backgroundColor = "rgba(255, 100, 100, 0.3)"

                setTimeout(() => {
                    eraseNumbers();
                }, 500)
                
                return;
            }

            points += operatorPoints[operator]

            pointsSpan.innerHTML = "Pontos: " + points

            // Update numbers and clear inputs
            

            firstNumberContainer.innerText = "";
            secondNumberContainer.innerHTML = resultNumber;

            eraseNumbers();

            // Check for win condition
            if (resultNumber === goalNumber) {
                
                //execute end things here


                goalTd.style.color = "orange"
                goalTd.innerText += " ✔"

                setTimeout(() => {
                    diceContainer.parentNode.removeChild(diceContainer) //KILL URSELF
                    resolve();
                }, 2000)
                
            }

            console.log(resultNumber);
        }

        // Add event listeners
        numberContainers.forEach((container, index) => {
            container.addEventListener("click", () => {
                numberClick(index);
            });
        });

        operatorContainers.forEach((container, index) => {
            container.addEventListener("click", () => {
                operatorClick(index);
            });
        });

        resetButton.addEventListener("click", () => {
            eraseNumbers()
            numberClickSound.play()
            
        })
        restartButton.addEventListener("click", () => {
            
            numberContainers.forEach((container, index) => {
                container.innerHTML = values[index];
                backSound.play()
            });

            
        })
    });
}
