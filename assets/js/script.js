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

const basicButton = document.getElementById ('basic-level');
const intermediateButton = document.getElementById ('intermediate-level');
const advancedButton = document.getElementById('advanced-level')
const previousButton = document.getElementById('btn-previous')
const nextButton = document.getElementById('btn-next')


// push the questions into  availableQuestions Array
function setbasicQuestions(){
    const totalQuestion = basicQuestions.length;
    for(let i=0; i<totalQuestion; i++){
    	availableQuestions.push(basicQuestions[i]);
        console.log(okay)
    }
 }



