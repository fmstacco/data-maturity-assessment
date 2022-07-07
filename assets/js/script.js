//Global Variables 
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const option = document.querySelector('option');

let questionCounter = 0;
let currentQuestion = 0;
let availableQuestions = [];
let availableOptions = [];
let availableQuickQuestions = [];
let availableQuickOptions = [];
const questionLimit = 5; 

const welcomeSectionContainer = document.querySelector(".welcome-section-container");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const contactUsbox = document.querySelector('.form-container')

const startButton = document.getElementById('start-button-id');
const startQuickQuizButton = document.getElementById('start-quick-quiz-btn');
const restartButton = document.getElementById('restart-quiz');
const nextButton = document.getElementById('btn-next');
const goBackHomePageButton = document.getElementById('go-back-home-page')
const contactUsButton = document.getElementById('contact-us')

let correctAnswers = 0;
let attempt = 0;


//QUICK QUIZ

function loadQuickQuizQuestions(){
const totalQuestion = quickQuizQuestions.length;
    for (let i=0; i<totalQuestion; i++) {
       availableQuickQuestions.push(quickQuizQuestions[i]);
    }
}

//set question number and question and options
function getNewQuickQuestionQuiz(){
    // set question number 
    questionNumber.innerHTML = "Question " + (questionCounter +1) + " of " + quickQuizQuestions.length;

    // set question text
    // get random question
    const questionIndex = availableQuickQuestions[Math.floor(Math.random() * availableQuickQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.questionQuick;
    // get the position of 'questionIndex' from the availableQuestion Array
    const index1= availableQuickQuestions.indexOf(questionIndex);
    // remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
    availableQuickQuestions.splice(index1,1);

//set options
//get the lenght of options
const optionLength = currentQuestion.optionsQuick.length;
// push options into availableOptions Array
for (let i=0; i<optionLength; i++) {
    availableQuickOptions.push(i)
}

optionContainer.innerHTML = '';
let animationDelay = 0.15;
// create options in html

for (let i=0; i < optionLength; i++) {
    // random option
    const optionIndex = availableQuickOptions[Math.floor(Math.random() * availableQuickOptions.length)];
        // get the position of 'optionIndex' from the availableQuickOptions Array
        const index2 = availableQuickOptions.indexOf(optionIndex);
    // remove the  'optionIndex' from the availableOptions Array, so that the option does not repeat
    availableQuickOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.optionsQuick[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
}
questionCounter++;
}

function startQuickQuiz() {
    // hide home box
    welcomeSectionContainer.classList.add("hide");
    // show quiz Box
    quizBox.classList.remove("hide");
    // first we will set all questions in availableQuestions Array
   resetQuickQuiz();

    loadQuickQuizQuestions();
    // second we will call getNewQuestion(); function
    getNewQuickQuestionQuiz(); 
}


function resetQuickQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    availableQuickQuestions = [];
}

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

    nextButton.classList.add('hide');


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
    if(questionCounter === questions.length){
          quizOver();
    }else{
        getNewQuestion();
    } 
  }

  
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

function goBackHomePage(){
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the welcome section
    welcomeSectionContainer.classList.remove("hide");

}

function contactUs(){
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the welcome section
    contactUsbox.classList.remove("hide");
}

function sendEmail(){
    var params = {
        from_name: document.getElementById("name").value,
        email_id: document.getElementById('email').value,
        company_name: document.getElementById('companyname').value
    }
         emailjs.send('service_7hetiwd', 'template_lmgc11t', params).then(function(res){
         alert('Success!' + res.status);
    })

}


window.onload = function() {
    //set all questions in availableQuestions Array
    loadQuestions();
    loadQuickQuizQuestions();
    //call getNewQuestion funtion
    getNewQuestion();
    getNewQuickQuestionQuiz();
   
}


//Add Event Listener for buttons 

startButton.addEventListener('click', startQuiz)
startQuickQuizButton.addEventListener('click', startQuickQuiz)
restartButton.addEventListener('click', tryAgainQuiz)
nextButton.addEventListener('click', next)
goBackHomePageButton.addEventListener ('click', goBackHomePage)
contactUsButton.addEventListener('click', contactUs)


