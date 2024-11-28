function createNumpadQuestion(question, answer) {
    const numpadContainer = document.querySelector(".numpad-container")
    const numpadNumbers = document.querySelectorAll(".numpad-button")
    const numpadAnswer = document.querySelector(".numpad-answer")



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
                    alert("respondendo " + numpadAnswer.value)
                    return;
                }
                if (number.innerText == "Limpar") {
                    numpadAnswer.value = "";
                }
            }
            
        })
    })
}


createNumpadQuestion()