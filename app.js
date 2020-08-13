const word = document.getElementById('word'),
	  text = document.getElementById('text'),
	  scoreEl = document.getElementById('score'),
	  timeEl = document.getElementById('time'),
	  endgameEl = document.getElementById('end-game-container'),
	  settingsBtn = document.getElementById('settings-btn'),
	  settings = document.getElementById('settings'),
	  settingsForm = document.getElementById('settings-form'),
	  difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
	'sigh',
	'tense',
	'airplane',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'quince',
	'eight',
	'admit',
	'feeble',
	'drag',
	'gold',
	'monkey',
	'mountain',
	'rock',
	'car',
	'elephent',
	'loving',
	'apple',
	'orange',
	'watermelon',
	'joke',
	'dude',
	'sheep',
	'bored',
	'buy',
	'bee',
	'education',
	'bear',
	'space',
	'freeze',
	'bank',
	'street'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10

// difficulty 
let difficulty = localStorage.getItem('difficulty') !== null ? 
localStorage.getItem('difficulty') : 'medium';

// get item from localStorage

difficultySelect.value = localStorage.getItem('difficulty') !== null ? 
localStorage.getItem('difficulty') : 'medium';

// Generate random words 
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

// Time count down with setInterval
let timerId = setInterval(updateTime, 1000);

// Update word in DOM
function updateWordDOM() {
	randomWord = getRandomWord();
	word.innerText = randomWord;
}

updateWordDOM();

// Update score in DOM
function updateScore() {
	score++;
	scoreEl.innerText = score;
}

// Game over 
function gameOver() {
	endgameEl.innerHTML = `
		<h1>Time is out</h1>
		<p>Your score: ${score}</p>
		<button onclick="location.reload()">Try again</button>
	`;
	endgameEl.style.display = 'flex';
}

// Time count down
function updateTime() {
	time--;
	timeEl.innerText = time + 's';

	if(time === 0) {
		clearInterval(timerId);
		gameOver();
	}
}

// Event listeners
text.addEventListener('input', e => {
	const currentWord = e.target.value;
	if(randomWord === currentWord) {
		updateWordDOM();
		updateScore();
		// Clear input
		e.target.value = '';

		if(difficulty === 'hard') {
			time += 2;
		} else if (difficulty === 'medium') {
			time += 3;
		} else {
			time += 5;
		}
	}
});

// Setting event btn
settingsBtn.addEventListener('click', () => {
	settings.classList.toggle('hide');
})

// Setting form event
settingsForm.addEventListener('change', e => {
	difficulty = e.target.value;

	localStorage.setItem('difficulty', difficulty);
});
