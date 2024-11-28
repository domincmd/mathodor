const operationColors = {
    "+": "rgb(255, 185, 54)",
    "-": "rgb(58, 94, 255)",
    "*": "rgb(255, 0, 0)",
    "/": "rgb(0, 255, 21)"
}

function setupGame(goalNumber = 8, operator = "+", values = [1, 2, 3, 4, 5]) {
    // Declaring elements
    const diceContainer = document.querySelector(".dice-container")
    const goalNumberContainer = document.querySelector(".goal-td");
    const currentNumberContainer = document.querySelector(".current-td");
    const numberContainers = document.querySelectorAll(".number");
    const operationContainers = document.querySelectorAll(".operator");
    const resetNumberButton = document.querySelector(".reset-button")


    diceContainer.style.display = "block"

    resetNumberButton.addEventListener("click", () => {
        resetNumbers()
    })

    let firstNumber = null;
    let secondNumber = null;

    // Syncing with frontend
    goalNumberContainer.innerHTML = goalNumber;
    //currentNumberContainer.innerHTML = startingNumber;

    operationContainers[["+", "-", "*", "/"].indexOf(operator)].style.backgroundColor = "rgba(255, 255, 255, 0.3)"

    function eraseEverything() {
        goalNumberContainer.innerHTML = "";

        numberContainers.forEach(numberContainer => {
            numberContainer.innerHTML = ""
        })

        
    }
    

    // Function to change the operator
    function changeOperator(newOperator) {
        if (!["+", "-", "/", "*"].includes(newOperator)) {
            alert("Error: invalid operator");
            return;
        }
        
        operationContainers[["+", "-", "*", "/"].indexOf(operator)].style.backgroundColor = operationColors[operator]
        operationContainers[["+", "-", "*", "/"].indexOf(newOperator)].style.backgroundColor = "rgba(255, 255, 255, 0.3)"

        operator = newOperator;
        
        console.log(operator);
    }

    // Function to perform the operation
    function makeOperation() {
        const firstNumberValue = parseInt(numberContainers[firstNumber].innerText);
        const secondNumberValue = parseInt(numberContainers[secondNumber].innerText);

        const resultNumber = eval(`${firstNumberValue} ${operator} ${secondNumberValue}`);

        if (resultNumber < 0 || Math.floor(resultNumber) != resultNumber) {
            resetNumbers()
            alert("that number be ilegal as fuck")
            return; 
        } 

        numberContainers[firstNumber].innerHTML = "";
        numberContainers[secondNumber].innerText = resultNumber;

        resetNumbers();

        // Check for win condition
        if (resultNumber === goalNumber) {
            eraseEverything()
            diceContainer.style.display = "none"
            alert("You Won!!!!!!!!!!!!!!!! :):):):))");
            return setupGame;
        }

        console.log(resultNumber);
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
            if (firstNumber == numberId) {
                alert("ya cant do that shit")
                return;
            }
            secondNumber = numberId;
            numberContainers[numberId].style.backgroundColor = "rgba(240, 240, 240, 0.3)";

            makeOperation();
        }

        console.log(firstNumber);
        console.log(secondNumber);
    }

    // Function to reset selected numbers
    function resetNumbers() {
        firstNumber = null;
        secondNumber = null;
        numberContainers.forEach(numberContainer => {
            numberContainer.style.background = "transparent";
        });
    }

    // Attach click event listener to each number container
    numberContainers.forEach((container, index) => {
        container.addEventListener('click', () => clickNumber(index));
    });

    operationContainers.forEach((container, index) => {
        container.addEventListener('click', () => changeOperator(["+", "-", "*", "/"][index]))
    })


    // Set the starting shit there
    for (let i = 0; i < values.length && i < numberContainers.length; i++) {
        numberContainers[i].innerText = values[i];
    }

    return;
}