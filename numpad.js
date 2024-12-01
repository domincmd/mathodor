async function createNumpadQuestion(question, answer) {
    return new Promise((resolve) => {
        //code here


        const quizContainer = document.querySelector(".old-quiz-container")
        const quizContainerCopy = quizContainer.cloneNode(true)
        const generalContainer = document.querySelector(".general-container")

        generalContainer.appendChild(quizContainerCopy)

        quizContainerCopy.classList.replace("old-quiz-container", "quiz-container")

        const numpadButtons = quizContainerCopy.querySelectorAll(".numpad-button")
        const questionContainer = quizContainerCopy.querySelector(".question-container")
        const numpadAnswer = quizContainerCopy.querySelector(".numpad-answer")
        const pointsSpan = document.querySelector(".points")

        questionContainer.innerHTML = question

        
        function clearInput() {
            numpadAnswer.value = ""
            backSound.play()
        }

        function answerQuestion() {
            const answerPrompt = parseInt(numpadAnswer.value)

            operatorClickSound.play()

            if (answer == answerPrompt) {
                alert("acertou")
                points += 2
                pointsSpan.innerHTML = "Pontos: " + points
                resolve()
                quizContainerCopy.parentNode.removeChild(quizContainerCopy) //KILL URSELF
                
                
            }else{
                alert("errou kkk")
            }

            
        }


        function clickedNumber(index) {
            numpadAnswer.value += index
            numberClickSound.play()
        }

        quizContainerCopy.style.display = "flex"

        numpadButtons.forEach((button, index) => {
            if (index == 10) {
                button.addEventListener("click", () => {clickedNumber(0)})
            }else if (index == 9) {
                button.addEventListener("click", () => {clearInput()})
            }else if (index == 11) {
                button.addEventListener("click", () => {answerQuestion()})
            }else{
                button.addEventListener("click", () => {clickedNumber(index+1)})
            }
            
        })
        
        
    })
}
