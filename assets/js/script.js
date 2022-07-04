//Define function startQuiz 
//Set of questions and answers 
//Give each answer an identifier 
//Each identifier will increment through each question
//St the end the identifier with the highest number is the winner 
//Display the answer and rest the quiz

//pass results frm previous question to the next page usig localcache

//Randomise the background of the quiz for each question

//Possible Results 
// 15 -21- 
// 10 - 15 - 
// 5- 10 -  
// 5 - A

//Global Variables 
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');

let questionCounter = 0;
let currentQuestion = 0;
let availableQuestions = [];
let availableOptions = [];
const questionLimit = 5; // if you want all questions "quiz.length"

const welcomeSectionContainer = document.querySelector(".welcome-section-container");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

const startButton = document.getElementById('start-button-id');
const restartButton = document.getElementById('restart-quiz');
const previousButton = document.getElementById('btn-previous');
const nextButton = document.getElementById('btn-next');

let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array

function loadQuestions() {
    const totalQuestion = questions.length;
    for (let i=0; i<totalQuestion; i++) {
        availableQuestions.push(questions[i]);
    }
}

//set question number and question and options 
function getNewQuestion(){
    // set question number 
    questionNumber.innerHTML = "Question " + (questionCounter +1) + " of " + questions.length;

    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.question;
    // get the position of 'questionIndex' from the availableQuestion Array
    const index1= availableQuestions.indexOf(questionIndex);
    // remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1,1);

//set options
//get the lenght of options
const optionLength = currentQuestion.options.length;
// push options into availableOptions Array
for (let i=0; i<optionLength; i++) {
    availableOptions.push(i)
}
optionContainer.innerHTML = '';
let animationDelay = 0.15;
// create options in html
for (let i=0; i < optionLength; i++) {
    // random option
    const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // get the position of 'optionIndex' from the availableOptions Array
    const index2 = availableOptions.indexOf(optionIndex);
    // remove the  'optionIndex' from the availableOptions Array, so that the option does not repeat
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
}
console.log(availableQuestions)
console.log(availableOptions)
questionCounter++;

}

// get the result of current attempt question
function getResult(element) {
    const id = parseInt(element.id);
    //get the answer by comparing the id
    if (id === currentQuestion.answer) {
        //set the blue color to the correct option
        element.classList.add("correct")
        correctAnswers++;
    } else {
        //set the red color to the incorrect option
        element.classList.add("wrong");
    }
    // if the answer is incorrect then show the correct option by adding green color the correct option
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
            optionContainer.children[i].classList.add("correct");
        }
    }
    unclickableOptions();

}


//make all the options unclickable once the user select a option ()
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}


//Function to load next question

function next() {
 
    if (questionCounter === questions.length) {
        quizOver();
    } else {
        getNewQuestion();
    }
  
}

//Function to load previous question




function quizOver() {
    //hide quiz quizBox
    quizBox.classList.add("hide");
    //show resultBox 
    resultBox.classList.remove("hide");
    quizResult();
}

//get the quiz Result
function quizResult() {
    const totalScore = correctAnswers;
    resultBox.querySelector(".total-score").innerHTML =
        `<h2 class="total-score">Your score: ${totalScore}</h2>`;
      
        if (totalScore > 7) {
            document.getElementById('score-feedback').innerHTML= `Congratulations! Your company seems to be data driven. You take data management seriously. You consider Information management as an asset and understand that data strategy is key to business success. Your company's data analysis are trusted, relevant and at the right quality. As you value continuous improvement, we invite you to fill the form below to discuss how Carpe Diem Data Solutions can support the sustentability of your data management.`;
        } else if (totalScore > 4) {
            document.getElementById('score-feedback').innerHTML = `Not bad! Your company seems to have a primary understood of data management. You have key performance indicators (KPY) in place. Governance is defined although there are informal roles, only some data is trusted and a get's data culture in place. Carpe Diem Data Solutions can help you to improve your processes and became a data driven company`;
        } else {
            document.getElementById('score-feedback').innerHTML = `Awn... Your company seems to have no formal data management. Data is collected, stored, and processed in an entirely operational context. Business processes are embryonic at best, while technology is very limited in use. Dealing with operation and change is difficult and quality of outputs is not trusted.`;
        }
        
    }



function startQuiz() {

    // hide home box 
    welcomeSectionContainer.classList.add("hide");
    // show quiz Box
    quizBox.classList.remove("hide");
    // first we will set all questions in availableQuestions Array
    resetQuiz();

    loadQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    availableQuestions = [];
}

function tryAgainQuiz() {
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}



window.onload = function() {
    //set all questions in availableQuestions Array
    loadQuestions();
    //call getNewQuestion funtion
    getNewQuestion();
}


//Add Event Listener for buttons 

startButton.addEventListener('click', startQuiz)
restartButton.addEventListener('click', tryAgainQuiz)
nextButton.addEventListener('click', next)
