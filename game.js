

const diceQuestions = [
    //ez questions
    ["dice", 18, "+", [1, 2, 10, 6, 20]],
    ["dice", 4, "+", [4, 1, 9, 2, 11]],
    ["dice", 3, "+", [9, 1, 12, 2, 2]],
    ["dice", 6, "+", [3, 2, 8, 4, 9]],
    ["dice", 6, "+", [1, 2, 2, 12, 9]],
    ["dice", 14, "+", [7, 9, 2, 9, 1]],
    ["dice", 5, "+", [2, 3, 4, 8, 9]],
    ["dice", 12, "+", [12, 9, 2, 2, 1]],
    ["dice", 11, "+", [5, 4, 7, 3, 1]],
    ["dice", 18, "+", [1, 2, 4, 9, 11]],

    //hard questions:

    ["dice", 54, "+", [4, 17, 5, 10, 8]],
    ["dice", 51, "+", [10, 7, 4, 17, 1]],
    ["dice", 50, "+", [1, 4, 7, 10, 17]],
    ["dice", 54, "+", [8, 6, 3, 8, 20]],
    ["dice", 54, "+", [9, 1, 9, 2, 7]],
    ["dice", 42, "+", [1, 9, 3, 20, 6]],
];

const numpadQuestions = [
    ["numpad", "Carlos faz panquecas. Ele tem uma receita para 15 panquecas e decide dobrar as proporções. Quantas panquecas ele poderá fazer?", 30],
    ["numpad", "Aqui está uma sequência lógica de números: 58 ; 48 ; 38 ; 28... Qual é o próximo número?", 18],
    ["numpad", "No mercado, gastei R$ 10,00 na seção de frutas. Tenho uma nota de R$ 20,00. Quanto me resta para comprar carne?", 10],
    ["numpad", "Daqui a 35 minutos, serão 04h15. Que horas são agora?", 340],
    ["numpad", "Na minha grande caixa de Lego, há três cores diferentes. Tenho 25 vermelhos, 15 azuis e 20 brancos. Quantos Legos eu tenho ao todo?", 60],
    ["numpad", "Aqui está uma sequência lógica de números: 2 ; 9 ; 16 ; 23... Qual é o próximo número?", 30],
    ["numpad", "Victor pega 18 balas de um pacote de 50 balas. Ele dá metade do que sobra para Júlia. Quantas balas Júlia tem?", 16],
    ["numpad", "Adicione 49 a 83.", 132],
    ["numpad", "Ana comprou 3 pacotes de feijão. Cada pacote pesa 5 kg. Qual é o peso total?", 15],
    ["numpad", "Aqui está uma sequência lógica de números: 5 ; 10 ; 20 ; 40... Qual é o próximo número?", 80],
    ["numpad", "Um ônibus tem 12 passageiros. Em uma parada, descem 4 pessoas e entram 7. Quantas pessoas estão no ônibus agora?", 15],
    ["numpad", "Pedro tinha R$ 120,00. Ele gastou R$ 35,00. Quanto dinheiro ele ainda tem?", 85],
    ["numpad", "Multiplique 7 por 8.", 56],
    ["numpad", "Maria tem 15 laranjas. Ela dá 5 para seu irmão e 3 para sua amiga. Quantas laranjas ela tem agora?", 7],
    ["numpad", "Aqui está uma sequência lógica de números: 81 ; 64 ; 49 ; 36... Qual é o próximo número?", 25],
    ["numpad", "O relógio marca 15h20. Quantos minutos faltam para as 16h?", 40],
];


let points = 0

//defining audios
const numberClickSound = new Audio('/sfx/numberclick.mp3');
const operatorClickSound = new Audio('/sfx/operatorclick.mp3');
const illegalSound = new Audio('/sfx/illegal.mp3');
const backSound = new Audio('/sfx/back.mp3');

function createQuestionsArray(dice, numpad, length) {
    let finalArray = [];
    let diceClone = [...dice];
    let numpadClone = [...numpad];

    if (length > dice.length + numpad.length) {
        alert("Error: Requested length is too long.");
        return;
    }

    for (let i = 0; i < length; i++) {
        if (diceClone.length === 0) {
            // Only numpadClone remains
            const index = Math.floor(Math.random() * numpadClone.length);
            finalArray.push(numpadClone[index]);
            numpadClone.splice(index, 1);
        } else if (numpadClone.length === 0) {
            // Only diceClone remains
            const index = Math.floor(Math.random() * diceClone.length);
            finalArray.push(diceClone[index]);
            diceClone.splice(index, 1);
        } else {
            // Both arrays have elements, choose randomly
            if (Math.random() < 0.5) {
                const index = Math.floor(Math.random() * diceClone.length);
                finalArray.push(diceClone[index]);
                diceClone.splice(index, 1);
            } else {
                const index = Math.floor(Math.random() * numpadClone.length);
                finalArray.push(numpadClone[index]);
                numpadClone.splice(index, 1);
            }
        }
    }

    return finalArray;
}



// Define the async loop
async function processEntriesSequentially(entries) {
    for (const entry of entries) {
        try {
            if (entry[0] === "dice") {
                await createDiceQuestion(entry[1], entry[2], entry[3]); // Wait for dice question
            } else if (entry[0] === "numpad") {
                await createNumpadQuestion(entry[1], entry[2]); // Wait for numpad question
            }
        } catch (error) {
            console.error(`Error processing entry ${JSON.stringify(entry)}:`, error);
        }
    }
    console.log('All entries processed');
}

const questions = createQuestionsArray(diceQuestions, numpadQuestions, 15);

console.log(questions)

// Call the async loop
processEntriesSequentially(questions);
