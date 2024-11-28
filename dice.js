const operatorColors = {
    "+": "rgb(255, 185, 54)",
    "-": "rgb(58, 94, 255)",
    "*": "rgb(255, 0, 0)",
    "/": "rgb(0, 255, 21)"
}

const operatorPoints = {
    "+": 1,
    "-": 2,
    "*": 1,
    "/": 3
}

let goalNumber = 8
let operator = "+"
let values = [1, 2, 3, 4, 5]
let timeout = 1000
let firstTime = false

const diceContainer = document.querySelector(".dice-container");
const goalNumberContainer = document.querySelector(".goal-td");
const currentNumberContainer = document.querySelector(".current-td");
const numberContainers = document.querySelectorAll(".number");
const operationContainers = document.querySelectorAll(".operator");
const resetNumberButton = document.querySelector(".reset-button");
const restartNumberButton = document.querySelector(".restart-button")



function createDiceQuestion() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Declaring elements
            
            

            diceContainer.style.display = "block";

            

            resetNumberButton.addEventListener("click", () => {
                resetNumbers();
            });

            let firstNumber = null;
            let secondNumber = null;

            // Syncing with frontend
            goalNumberContainer.innerHTML = goalNumber;

            

            changeOperator(operator)

            function eraseEverything() {
                goalNumberContainer.innerHTML = "";
                numberContainers.forEach((numberContainer) => {
                    numberContainer.innerHTML = "";
                });
            }

            // Function to change the operator
            function changeOperator(newOperator) {
                if (!["+", "-", "/", "*"].includes(newOperator)) {
                    alert("Error: invalid operator");
                    return;
                }
                const oldOperatorContainer = operationContainers[["+", "-", "*", "/"].indexOf(operator)];
                oldOperatorContainer.style.backgroundColor = operatorColors[operator]
                oldOperatorContainer.style.color = "white"

                
                const newOperatorContainer = operationContainers[["+", "-", "*", "/"].indexOf(newOperator)];
                newOperatorContainer.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
                newOperatorContainer.style.color = operatorColors[newOperator];

                operator = newOperator;

                
                
            }

            // Function to perform the operation
            function makeOperation(firstNum, secondNum) {
                const firstNumberValue = parseInt(numberContainers[firstNum].innerText);
                const secondNumberValue = parseInt(numberContainers[secondNum].innerText);

                const resultNumber = eval(`${firstNumberValue} ${operator} ${secondNumberValue}`);

                if (resultNumber < 0 || resultNumber%1 !== 0) {
                    resetNumbers();
                    alert("ya cant do that shit")
                    return;
                }



                numberContainers[firstNumber].innerHTML = "";
                numberContainers[secondNumber].innerText = resultNumber;

                points += operatorPoints[operator]

                resetNumbers();

                // Check for win condition
                if (resultNumber === goalNumber) {
                    eraseEverything();
                    diceContainer.style.display = "none";
                    alert("You Won!!!!!!!!!!!!!!!! :):):):))");
                    resolve(); // Resolve the promise when the goal is reached
                    return;
                }

                console.log(goalNumber)
            }

            // Function to handle number clicks
            function clickNumber(numberId) {
                if (numberContainers[numberId].innerText === "") {
                    console.log("You selected an empty number!");
                    return;
                }

                if (firstNumber === null) {
                    firstNumber = numberId;
                    numberContainers[numberId].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                } else if (secondNumber === null) {
                    if (firstNumber === numberId) {
                        alert("ya cant do that shit");
                        return;
                    }
                    secondNumber = numberId;
                    numberContainers[numberId].style.backgroundColor = "rgba(240, 240, 240, 0.3)";
                    
                    makeOperation(firstNumber, secondNumber);
                }
                
                
            }

            


            // Function to reset selected numbers
            function resetNumbers() {
                firstNumber = null;
                secondNumber = null;
                numberContainers.forEach((numberContainer) => {
                    numberContainer.style.background = "transparent";
                });
            }

            for (let i = 0; i < values.length && i < numberContainers.length; i++) {
                numberContainers[i].innerText = values[i];
            }

            

            if (firstTime) {
                numberContainers.forEach((container, index) => {
                    container.addEventListener("click", () => clickNumber(index));
                });
                
                operationContainers.forEach((container, index) => {
                    container.addEventListener("click", () => changeOperator(["+", "-", "*", "/"][index]));
                });
                
                restartNumberButton.addEventListener("click", () => {
                    resetNumbers();
                    for (let i = 0; i < values.length && i < numberContainers.length; i++) {
                        numberContainers[i].innerText = values[i];
                    }
                });
            }            

            // Set the starting values
            
        }, timeout)
        
    });
}