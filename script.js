const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++ ;
    setNextQuestion();
})

function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    answerButtonsElement.querySelectorAll('button').forEach(button => {
        button.classList.remove('animationCorrect'); // Remove the animationCorrect class from all buttons
    });
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');

    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild
        )
    };
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass
    (document.body, correct);
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);

        if (button.dataset.correct) {
            button.classList.add('animationCorrect'); // Apply the animationCorrect animation to correct answers.
          }

    })

    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct){
        element.classList.add('correct');
    } else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');;
    element.classList.remove('wrong');
}


const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            {text: 'Hyper Transfer Markup Language', correct: false },
            {text: 'Hyperlink and Text Markup Language', correct: false },
            {text: 'Hypertext Markup Language', correct: true },
            {text: 'Hyper Technical Markup Language', correct: false }
        ]
    },

    {
        question: 'Which of the following CSS properties is used to change the text color of an element?',
        answers: [
            {text: 'background-color', correct: false },
            {text: 'color', correct: true },
            {text: 'border', correct: false },
            {text: ' font-size', correct: false }
        ]
    },

    {
        question: 'What is the purpose of the "href" attribute in an anchor (<a>) tag?',
        answers: [
            {text: "Define the anchor's class", correct: false },
            {text: "Specify the anchor's class", correct: false },
            {text: "Set the anchor's background color", correct: false },
            {text: "Provide the link's destination URL", correct: true }
        ]
    },

    {
        question: 'Which programming language is commonly used for adding interactivity to web pages?',
        answers: [
            {text: 'Hypertext Markup Language (HTML)', correct: false },
            {text: 'Cascading Style Sheets (CSS)', correct: false },
            {text: 'Python', correct: false },
            {text: 'JavaScript', correct: true }
        ]
    },

    {
        question: 'Which of the following tags is used to create an unordered list in HTML?',
        answers: [
            {text: '<ul>', correct: true },
            {text: '<ol>', correct: false },
            {text: '<li>', correct: false },
            {text: '<dl>', correct: false }
        ]
    }
];