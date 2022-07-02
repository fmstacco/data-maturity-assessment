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

const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');

const welcomeSectionContainer = document.querySelector(".welcome-section-container");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

const startButton = document.getElementById ('start-button-id');
const previousButton = document.getElementById('btn-previous');
const nextButton = document.getElementById('btn-next');

const questionLimit = 5; // if you want all questions "quiz.length"
let questionCounter = 0;
let currentQuestion;

let availableQuestions = [];
let availableOptions = [];

let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array
function loadQuestions(){
    const totalQuestion = Questions.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(Questions[i]);
        }
    }

//set question number and question and options 
function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + Questions.length;

//set question text
//get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.question;
    
    //get the postition of 'questionIndex' from the availableQuestions Array
    const index1 = availableQuestions.indexOf(questionIndex)
        
    //remove the 'questionIndex' from the availableQuestions Array, so that the question does not repeat
    availableQuestions.splice(index1,1);

    //set options
    //get the lenght of options

    const OptionLength = currentQuestion.options.length;
     // push options into availableOptions Array
    for(let i=0; i<OptionLength; i++) {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create options in html
    for(let i=0; i<OptionLength; i++) {
    // random option
    const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];    
    // get the position of 'optionIndex' from the availableOptions Array
    const index2 =  availableOptions.indexOf(optionIndex);
    // remove the  'optionIndex' from the availableOptions Array , so that the option does not repeat
    availableOptions.splice(index2,1);
    const Option = document.createElement("div");
    Option.innerHTML = currentQuestion.options[optionIndex];
    Option.id = optionIndex;
    Option.style.animationDelay =animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    Option.className = "option";
    optionContainer.appendChild(Option);
    Option.setAttribute("onclick","getResult(this)");
    }
   console.log(availableQuestions)
   console.log(availableOptions)
    questionCounter++;
 }
    

// get the result of current attempt question
function getBasicResult(element){
  const id = parseInt(element.id);
  //get the answer by comparing the id
  if(id === currentBasicQuestion.answer){
    //set the blue color to the correct option
    element.classList.add("correct")  
    correctAnswers++;
}else{
    //set the red color to the incorrect option
    element.classList.add("wrong");
}
 // if the answer is incorrect then show the correct option by adding green color the correct option
 const optionLen = optionContainer.children.length;
 for(let i=0; i<optionLen; i++){
     if(parseInt(optionContainer.children[i].id) === currentBasicQuestion.answer){
       optionContainer.children[i].classList.add("correct");  	    
  }
}
  unclickableOptions();

}


//make all the options unclickable once the user select a option ()
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i < optionLen; i++){
    	optionContainer.children[i].classList.add("already-answered");
    }
 }

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === basicQuestions.length){
        quizOver();
    }else{
        getNewBasicQuestion();
    }
}


function quizOver(){
    //hide quiz quizBox
    quizBox.classList.add("hide");
    //show resultBox 
    resultBox.classList.remove("hide");
    quizResult();
}

//get the quiz Result
function quizResult(){
    const totalScore = correctAnswers;
        resultBox.querySelector(".total-score").innerHTML = 
         `<h1 class="total-score">Your score: ${totalScore}</h1>`;
      

}

function startBasicQuiz(){
  
    // hide home box 
    welcomeSectionContainer.classList.add("hide");
    // show quiz Box
    quizBox.classList.remove("hide");
   // first we will set all questions in availableQuestions Array
   loadBasicQuestions();
   // second we will call getNewQuestion(); function
   getNewBasicQuestion();
  }





window.onload = function() {
    //set all questions in availableQuestions Array
    loadBasicQuestions();
    //call getNewQuestion funtion
    getNewBasicQuestion();
}


 //Add Event Listener for buttons 

basicButton.addEventListener('click', startBasicQuiz)
nextButton.addEventListener('click', next)
