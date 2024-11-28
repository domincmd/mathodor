const quizContainer = document.querySelector(".quiz-container")

function createNumpadQuestion(question, answer) {
    quizContainer.style.display = "block"
    
    
    const numpadContainer = document.querySelector(".numpad-container")
    const numpadNumbers = document.querySelectorAll(".numpad-button")
    const numpadAnswer = document.querySelector(".numpad-answer")
    const questionContainer = document.querySelector(".question-container")

    questionContainer.innerHTML = question;

    


    function numberClicked(number) {
        console.log(number)
        numpadAnswer.value += number
    }



    numpadNumbers.forEach(number => {
        number.addEventListener("click", () => {
            if (/^\d+$/.test(number.innerText)) {
                numberClicked(parseInt(number.innerText))
            }else{
                if (number.innerText == "Responder") {
                    
                    if (numpadAnswer.value.toLowerCase() == answer) {
                        quizContainer.style.display = "none"
                        alert("acertou poha")
                        return

                    }else{
                        alert("errou poha")
                    }
                }
                if (number.innerText == "Limpar") {
                    numpadAnswer.value = "";
                }
            }
            
        })
    })
}

quizContainer.style.display = "none"
