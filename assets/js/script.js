
 /* This script was developed through this tutorial: https://www.youtube.com/watch?v=J8QbjXdVl9c&list=PLJAFEg3vkcQN6NGwzI0KX_ZC6dLQjkfeU
  
  I borrowed the code from this tutorial to help create the quiz, randomize the questions and options.
  I have also customized some of the code to achieve the project goals.
  */

//Variables
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');

let questionCounter = 0;
let currentQuestion = 0;
let availableQuestions = [];
let availableOptions = [];

const welcomeSectionContainer = document.querySelector(".welcome-section-container");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const contactUsbox = document.querySelector('.form-container');

const restartButton = document.getElementById('restart-quiz');
const goBackHomePageButton = document.getElementById('go-back-home-page');
const contactUsButton = document.getElementById('contact-us');

let correctAnswers = 0;

/* The function loadQuestions pushes the questions into availableQuestions Array.
It is called on the startQuiz function and window.onload*/
function loadQuestions() {
	const totalQuestion = questions.length;
	for (let i = 0; i < totalQuestion; i++) {
		availableQuestions.push(questions[i]);
	}
}

/*The funcion getNewQuestion sets question number, question and options. 
It is called on startQuiz(), nextCompleteQuiz() and window.onload to set a new question  */
function getNewQuestion() {
	// set question number 
	questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questions.length;

	// set question text
	// get random question
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.question;
	// get the position of 'questionIndex' from the availableQuestion Array
	const index1 = availableQuestions.indexOf(questionIndex);
	// remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat.
	availableQuestions.splice(index1, 1);

	//set options
	//get the lenght of options
	const optionLength = currentQuestion.options.length;
	// push options into availableOptions Array
	for (let i = 0; i < optionLength; i++) {
		availableOptions.push(i);
	}
	optionContainer.innerHTML = '';
	let animationDelay = 0.15;
	// create options in html
	for (let i = 0; i < optionLength; i++) {
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
	nextCompleteQuizButton.classList.add('hide');
	questionCounter++;
}

/* The function getResult(), gets the result of current attempt question and sets the correct and wrong question.
It also adds a green color when answered corrected and red color when answered wrong*/
function getResult(element) {
	const id = parseInt(element.id);
	//get the answer by comparing the id
	if (id === currentQuestion.answer) {
		//set the green color to the correct option
		element.classList.add("correct");
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

/*The funcion unclickableOptions getNewQuestion make all the options unclickable once the user select a option. 
It is called on getResult() function 
*/
function unclickableOptions() {
	const optionLen = optionContainer.children.length;
	for (let i = 0; i < optionLen; i++) {
		optionContainer.children[i].classList.add("already-answered");
	}
	nextCompleteQuizButton.classList.remove('hide');
}

/*The funcion nextCompleteQuiz() loads the next question when the user presses the button Next. 
It also calls the quizOver() and getResult()function and  when the user reaches the questions length/answers all the questions.*/
function nextCompleteQuiz() {

	if (questionCounter === questions.length-20) {
		quizOver();
	} else {
		getNewQuestion();
	}
}

//Variable to get the element 
const nextCompleteQuizButton = document.getElementById('next-complete-button');

//Event Listener for the Next button
nextCompleteQuizButton.addEventListener('click', nextCompleteQuiz);

/*The funcion quizOver() hides the quizBox by adding a class "hide", shows the resultBox by removing the class "hide"
and calls the function quizResult().*/
function quizOver() {
	//hide quiz quizBox
	quizBox.classList.add("hide");
	//show resultBox 
	resultBox.classList.remove("hide");
	quizResult();
}

//The function quizResult gets the quiz Result(total-score) and informs the user their feedback according to the total-score.
function quizResult() {
	const totalScore = correctAnswers;
	resultBox.querySelector(".total-score").innerHTML =
		`<h2 class="total-score">Your score: ${totalScore}</h2>`;

	if (totalScore > 17) {
		document.getElementById('score-feedback').innerHTML = `Congratulations! Your company seems to be data driven. You take data management seriously. You consider Information management as an asset and understand that data strategy is key to business success. Your company's data analysis are trusted, relevant and at the right quality. As you value continuous improvement, we invite you to hit the contact us button, fill the form to discuss how Carpe Diem Data Solutions can support the sustentability of your data management.`;
	} else if (totalScore > 10) {
		document.getElementById('score-feedback').innerHTML = `Not bad! Your company seems to have a primary understood of data management. You have key performance indicators (KPY) in place. Governance is defined although there are informal roles, only some data is trusted and a get's data culture in place. Carpe Diem Data Solutions can help you to improve your processes and became a data driven company`;
	} else {
		document.getElementById('score-feedback').innerHTML = `Awn... Your company seems to have no formal data management. Data is collected, stored, and processed in an entirely operational context. Business processes are embryonic at best, while technology is very limited in use. Dealing with operation and change is difficult and quality of outputs is not trusted. We invite you to  hit the contact us button, fill the form to discuss how Carpe Diem Data Solutions can support the sustentability of your data management.`;
	}
}

//START QUIZ

/* The function startQuiz hides the welcome section by adding a class "hide", shows the quiz Box by removing the class "hide".
It calls the functions: 
*resetQuiz() to starts que quiz from the question 1.
*loadQuestions() to set all questions in availableQuestions Array.
*getNewQuestion() to get a question and start que quiz.
*/
function startQuiz() {
	// Hide the welcome section by adding a class "hide".
	welcomeSectionContainer.classList.add("hide");
	// Show quiz Box by removing the "hide" class.
	quizBox.classList.remove("hide");
	//Reset the quiz so it starts from que question 1.
    resetQuiz();
    // Set all questions in availableQuestions Array
	loadQuestions();
	// We call getNewQuestion() function
	getNewQuestion();
}

//Variable for the button "Complete Assessment"
const startButton = document.getElementById('start-button-id');

//Event Listener for the button "Complete Assessment" to start the Quiz
startButton.addEventListener('click', startQuiz);

//RESET QUIZ
/*The function resetQuiz will be used on tryAgainQuiz() and startQuiz() functions 
to reset the quiz so it starts from que question 1*/
function resetQuiz() {
	questionCounter = 0;
	correctAnswers = 0;
	availableQuestions = [];
}

/*The function tryAgainQuiz will be used on tryAgainQuiz() and startQuiz() functions 
to reset the quiz so it starts from que question 1*/
function tryAgainQuiz() {
	// hide the resultBox
	resultBox.classList.add("hide");
	// show the quizBox
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}

//Variable for the button "restartQuiz"
restartButton.addEventListener('click', tryAgainQuiz);

//Event Listener for the button "Restart Quiz" to restart the Quiz
restartButton.addEventListener('click', tryAgainQuiz);

/*The function goBackHomePage, throught the button "Go Back To HomePage" takes the user to the HomePage.
It hides the resultBox by adding a class "hide" and shows the welcome section by removing a class "hide".*/
function goBackHomePage() {
	// hide the resultBox
	resultBox.classList.add("hide");
	// show the welcome section
	welcomeSectionContainer.classList.remove("hide");
}

//Event Listener for the button "Go Back to Home Page" to go back to homepage.
goBackHomePageButton.addEventListener('click', goBackHomePage);

/*The function contactUs, throught the button "Contact Us" takes the user to the form screen.
It hides the resultBox by adding a class "hide" and shows the form section by removing a class "hide".*/
function contactUs() {
	// hide the resultBox
	resultBox.classList.add("hide");
	// show the form section
	contactUsbox.classList.remove("hide");
}

//Event Listener for the button "Contact Us", which opens the form screen.
contactUsButton.addEventListener('click', contactUs);

/*Code to ACTIVATE the FORM to receive emails from the submited forms through emailjs developed through emailjs website and
this post on stackoverflow https://stackoverflow.com/questions/63265789/how-do-i-send-my-form-information-on-submit-to-my-email-with-emailjs */

//Getting the button from the DOM
let submitButton = document.getElementById('formbutton');

//Add event listener on click to the button - notice i added the event as argument to the function
submitButton.addEventListener('click', function(event) {

	//prevent the reload of the page. here i prevent the event.
	event.preventDefault();
	
	//Getting the name and email from the DOM
	let fullName = document.getElementById('fullname').value;
	let email = document.getElementById('email').value;
	let companyname = document.getElementById('companyname').value;

	//Sending the email with the name and email
	emailjs.send("service_7hetiwd", "template_lmgc11t",{
			"from_name": fullName,
			"from_email": email,
			"from_companyname": companyname,
		})

		.then(

	/*The function formSubmited was created with the help of this post on stackoverflow
	 https://pt.stackoverflow.com/questions/261476/redirecionar-usu%C3%A1rios-atrav%C3%A9s-de-um-formul%C3%A1rio*/		
		
	 	// function formSubmited redirects the user to form-destination-page when submited.
	 		function formSubmited() {
				var link = "form-destination-page.html";
				window.location.href = link;
				window.location.assign(link);
			},
			function formError() {
				//sweet alert in case error
				swal({
					title: "Aww..!",
					text: "Something went wrong! Please refresh the page and submit the form again!",
					icon: "error",
				  });
}
		);});