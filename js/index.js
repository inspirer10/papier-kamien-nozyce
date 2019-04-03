'use strict';

var output = document.getElementById('output');
var result = document.getElementById('result');
var round = document.getElementById('rounds');
var info = document.getElementById('informations');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');

var playerScore = 0;
var computerScore = 0;
var win = 0;
var block = true;

var log = function(text){
	output.innerHTML = (text + '<br><br>');
};

var score = function(text){
	result.innerHTML = (text + '<br><br>');
};

var info = function(text){
	informations.innerHTML = (text + '<br>');
};
	

// RUCH KOMPUTERA - LOSOWANIE
var computerMove = function() {
	var random = (Math.floor(Math.random() * (3 - 1 + 1)) + 1);
	if (random == 1) {
		return 'PAPER';
	} else if (random == 2) {
		return 'ROCK';
	} else if (random == 3) {
		return 'SCISSORS';
	}
};
  

// NEW_GAME - zaczęcie gry
round.addEventListener('click', function(){
	win = parseFloat(window.prompt('Podaj ilość wygranych rund do których toczyć ma się gra !'));
	if(isNaN(win)) {
		info('Podano złą wartość! Wpisz liczbę!<br>');
	} else {
		info('Gra będzie toczyć sie do ' + win + ' wygranych rund !<br>');
		block = false;
	};

	playerScore = 0;
	computerScore = 0;
	score(playerScore + ' - ' + computerScore);	
	
});

                                                             
//  FUNKCJA GŁÓWNA - playerMove
var playerMove = function(playerChoice){
	var computerChoice = computerMove();
	var roundResult = '';
	var text = '';

	if ((playerChoice == 'PAPER' && computerChoice == 'ROCK') || (playerChoice == 'SCISSORS' && computerChoice == 'PAPER') ||
		(playerChoice == 'ROCK' && computerChoice == 'SCISSORS')) {
		roundResult = ' WYGRAŁEŚ! ';
		text = 'GRATULACJE ! ';
		playerScore++;
	} else if ((playerChoice == 'PAPER' && computerChoice == 'SCISSORS') || (playerChoice == 'SCISSORS' && computerChoice == 'ROCK') || (playerChoice == 'ROCK' && computerChoice == 'PAPER')) {
		roundResult = ' Przegrałeś :(  ';
		text = 'Powodzenia następnym razem ! '
		computerScore++;
	} else if ((playerChoice == 'PAPER' && computerChoice == 'PAPER') || (playerChoice == 'SCISSORS' && computerChoice == 'SCISSORS') || (playerChoice == 'ROCK' && computerChoice == 'ROCK')) {
		roundResult = 'REMIS ! ';
		text = '';
	}
	
	log(roundResult + '  zagrałeś:  ' + playerChoice + ', Komputer zagrał:  ' + computerChoice + '<br>' + text);
	score(playerScore + ' - ' + computerScore);	

	if (playerScore == win) { 
		info('<strong>WYGRAŁEŚ</strong> CAŁĄ GRĘ, <strong>GRATULACJE!</strong>');
		block = true;
		log('Gra skończona, <strong>kliknij</strong> Przycisk <strong>New Game</strong> !');
	} else if (computerScore == win) { 
		info('<strong>PRZEGRAŁEŚ</strong> CAŁĄ GRĘ, <strong>POWODZENIA NASTĘPNYM RAZEM !</strong>');
		block = true;
		log('Gra skończona, <strong>kliknij</strong> Przycisk <strong>New Game</strong> !');
	};

};


buttonPaper.addEventListener('click', function(){
	// kod, który ma być wykonany w momencie klikniecia	
	if (!block) {
		playerMove('PAPER'); 
	}
});

buttonRock.addEventListener('click', function(){
    // kod, który ma być wykonany w momencie klikniecia
	if (!block) {
		playerMove('ROCK'); 
	}
});

buttonScissors.addEventListener('click', function(){
    // kod, który ma być wykonany w momencie klikniecia
	if (!block) {
		playerMove('SCISSORS'); 
	}
});