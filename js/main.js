const questions = [
	{
		question: 'Enter Your Email',
		pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	{ question: 'Enter Your Password', type: 'password' }
];

let position = 0;
let shakeTime = 100;

// Event listener
const formBox = document.querySelector('#form-box');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const inputGroup = document.querySelector('#input-group');
const inputControl = document.querySelector('#input-control');
const labelControl = document.querySelector('#label-control');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');

document.addEventListener('DOMContentLoaded', loadQuestion);
nextBtn.addEventListener('click', loadNewQuestion);
inputControl.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		loadNewQuestion();
	}
});

// Get question from array & add to markup
function loadQuestion() {
	// get current question
	labelControl.innerHTML = questions[position].question;
	// get current type;
	inputControl.type = questions[position].type || 'text';
	// get current answer
	inputControl.value = questions[position].answer || '';

	// set progress bar width - variable to the question length
	progressBar.style.width = position * 100 / questions.length + '%';

	// add user icon or back arrow depending on question
	prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

	showQuestion();
}

// Display question to user
function showQuestion() {
	inputGroup.style.opacity = 1;
	inputProgress.style.transition = '';
	inputProgress.style.width = '100%';
}

// Hide question from user
function hideQuestion() {
	inputGroup.style.opacity = 0;
	labelControl.style.marginLeft = 0;
	inputProgress.style.width = 0;
	inputProgress.style.transition = 'none';
	inputGroup.style.border = null;
}

function transform(x, y) {
	formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// load new question
function loadNewQuestion() {
	if (!inputControl.value.match(questions[position].pattern || /.+/)) {
		inputFail();
	} else {
		inputPass();
	}
}

function inputFail() {
	formBox.className = 'error';
	// repeat shake motion - set i to number of shakes
	for (let i = 0; i < 6; i++) {
		setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
		setTimeout(transform, shakeTime * 6, 0, 0);
		inputControl.focus();
	}
}

function inputPass() {
	formBox.className = '';

	questions[position].answer = inputControl.value;

	position++;

	// if new question, hide current and get next
	if (questions[position]) {
		hideQuestion();
		loadQuestion();
	} else {
		// remove if no more questions
		hideQuestion();
		formBox.className = 'close';
		progressBar.style.width = '100%';

		// form complete
		formComplete();
	}
}

function formComplete() {
	const h1 = document.createElement('h1');
	h1.classList.add('end');
	h1.appendChild(
		document.createTextNode(`
    Hey ${questions[0].answer}, Your details are secured
    `)
	);

	setTimeout(() => {
		formBox.parentElement.appendChild(h1);
		setTimeout(() => (h1.style.opacity = 1), 50);
	}, 1000);
}
