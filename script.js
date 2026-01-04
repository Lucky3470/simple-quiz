const questions = [
    {
        question: "What is the national animal of Nepal?",
        answers:[
            {text: "Tiger", correct: false},
            {text: "Lion", correct: false},
            {text: "Cow", correct: true},
            {text: "Elephant", correct: false}
        ]
    },
        

        {question: "Which is the highest mountain in Nepal?",
        answers:[
            {text: "Kanchenjunga", correct: false},
            {text: "Lhotse", correct: false},
            {text: "Mount Everest", correct: true},
            {text: "Makalu", correct: false}
        ]
    },
        {question: "What is the national flower of Nepal?",
        answers:[
            {text: "Rose", correct: false},
            {text: "Rhododendron", correct: true},
            {text: "Lotus", correct: false},
            {text: "Sunflower", correct: false}
        ]
    },

       { question: "What is the capital city of Nepal?",
        answers:[
            {text: "Pokhara", correct: false},
            {text: "Lalitpur", correct: false},
            {text: "Bhaktapur", correct: false},
            {text: "Kathmandu", correct: true}
        ]}

    
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
currentQuestionIndex = 0;
score = 0;
nextButton.innerHTML = "Next";
showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =`Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();