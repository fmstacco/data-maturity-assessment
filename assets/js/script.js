//Define function startQuizz 
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

const questionNumber = document.querySelector ('.question-number');
const questionText = document.querySelector ('.question-text');
const optionContainer = document.querySelector('option-container');

const basicButton = document.getElementById ('basic-level');
const intermediateButton = document.getElementById ('intermediate-level');
const advancedButton = document.getElementById('advanced-level');
const previousButton = document.getElementById('btn-previous');
const nextButton = document.getElementById('btn-next');

let questionCounter = 0;
let currentQuestion;
let availableBasicQuestions = [];

// push the questions into  availableQuestions Array
function loadBasicQuestions(){
    const totalQuestion = basicQuestions.length;
    for(let i=0; i<totalQuestion; i++){
        availableBasicQuestions.push(basicQuestions[i]);
        }
    }

//set question number and question and options 
function getNewBasicQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter +1) + " of " + basicQuestions.length;

//set question text
//get random question
    const questionBasicIndex = availableBasicQuestions[Math.floor(Math.random() * availableBasicQuestions.length)]
    currentQuestion = questionBasicIndex;
    questionText.innerHTML = currentQuestion.q;
    
    //console.log(questionBasicIndex)
}



window.onload = function() {
    //set all questions in availableQuestions Array
    loadBasicQuestions();
    //call getNewQuestion funtion
    getNewBasicQuestion();
}


 //Add Event Listener for buttons 

 basicButton.addEventListener('click', loadBasicQuestions)

