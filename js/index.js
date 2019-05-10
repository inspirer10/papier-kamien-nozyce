'use strict';

(function () {

	var output = document.getElementById('output');
	var result = document.getElementById('result');
	var round = document.getElementById('rounds');
	var informations = document.getElementById('score');
	var gameButtons = document.querySelectorAll('.player-move');
	var gameInfo = document.querySelector('#gameInfo');


	// obiekt
	var params = {
		currentRound: 0,
		playerScore: 0,
		computerScore: 0,
		block: true,
		progress: []  // tablica
	};


	var log = function (text) {
		output.innerHTML = (text + '<br><br>');
	};

	var score = function (text) {
		result.innerHTML = (text + '<br><br>');
	};

	var info = function (text) {
		informations.innerHTML = (text + '<br>');
	};

	var helpful = function (text) {
		gameInfo.innerHTML = (text + '<br>');
	};



	var modalLinks = document.querySelectorAll('.show-modal');
	var modals = document.querySelectorAll('.modal');


	var showModal = function (modalToShow) {
		for (var i = 0; i < modals.length; i++) {
			modals[i].classList.remove('show');
		};

		var targetElement = document.querySelector(modalToShow); 		//modalHref   				to potem znika(?)
		document.querySelector('#modal-overlay').classList.add('show');
		targetElement.classList.add('show');							//modalHref						to potem znika(?)

	};



	// stosujemy kod dla wielu linków - nie trzeba go zmieniać, kiedy dodamy więcej linków lub guzików otwierających modale
	// TO ZNIKNIE W KOLEJNYM ETAPIE
	var modalLinks = document.querySelectorAll('.show-modal');
	// TO ZNIKNIE W KOLEJNYM ETAPIE

	for (var i = 0; i < modalLinks.length; i++) {
		modalLinks[i].addEventListener('click', showModal);
	}



	// Dodajemy  funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

	var hideModal = function (event) {
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};

	var closeButtons = document.querySelectorAll('.modal .close');

	for (var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', hideModal);
	}


	//  zamykanie modala poprzez kliknięcie w overlay. 

	document.querySelector('#modal-overlay').addEventListener('click', hideModal);



	// Musimy zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 

	for (var i = 0; i < modals.length; i++) {
		modals[i].addEventListener('click', function (event) {
			event.stopPropagation();
		});
	}
	//   działający modal! 




	// RUCH KOMPUTERA - LOSOWANIE
	var computerMove = function () {
		var random = (Math.floor(Math.random() * (3 - 1 + 1)) + 1);
		if (random == 1) {
			return 'papier';
		} else if (random == 2) {
			return 'kamień';
		} else if (random == 3) {
			return 'nożyce';
		}
	};



	// PRZYCISK/BUTTON  --> Nowa Gra!/NEW GAME - zaczęcie gry
	round.addEventListener('click', function () {
		params.rounds = parseFloat(window.prompt('Podaj ilość wygranych rund do których toczyć ma się gra !'));
		if (isNaN(params.rounds)) {
			helpful('Podano złą wartość! Wpisz liczbę!<br>');
		} else if (params.rounds == 1) {
			helpful('Gra będzie toczyć sie do ' + params.rounds + ' wygranej rundy !<br>');
			params.block = false;
		} else {
			helpful('Gra będzie toczyć sie do ' + params.rounds + ' wygranych rund !<br>');
			params.block = false;
		};

		params.progress = [];
		params.currentRound = 0;
		params.playerScore = 0;
		params.computerScore = 0;
		score(params.playerScore + ' - ' + params.computerScore);
	});


	//  FUNKCJA GŁÓWNA - playerMove  ( WYNIK RUND )
	var playerMove = function (playerChoice) {
		var computerChoice = computerMove();
		var roundResult = '';
		var text = '';

		if ((playerChoice == 'papier' && computerChoice == 'kamień') || (playerChoice == 'nożyce' && computerChoice == 'papier') ||
			(playerChoice == 'kamień' && computerChoice == 'nożyce')) {
			roundResult = ' WYGRANA! ';
			text = 'GRATULACJE ! ';
			params.playerScore++;
			params.currentRound++;
		} else if ((playerChoice == 'papier' && computerChoice == 'nożyce') || (playerChoice == 'nożyce' && computerChoice == 'kamień') || (playerChoice == 'kamień' && computerChoice == 'papier')) {
			roundResult = ' PRZEGRANA ';
			params.computerScore++;
			params.currentRound++;
		} else if ((playerChoice == 'papier' && computerChoice == 'papier') || (playerChoice == 'nożyce' && computerChoice == 'nożyce') || (playerChoice == 'kamień' && computerChoice == 'kamień')) {
			roundResult = 'REMIS ';
			params.currentRound++;
		}


		var data = {
			currentRound: params.currentRound, 					//numer akutalnej rundy
			player: playerChoice, 								//ruch gracza
			ai: computerChoice, 								//ruch komputer
			roundResult: roundResult,	 						//wynik rundy (wygrana,remis,porażka)
			gameResult: params.playerScore + ' - ' + params.computerScore	// wynik gry po rundzie (1-0 3-2)
		};

		params.progress.push(data);

		log(roundResult + '  Zagrałeś:  ' + playerChoice + ', Komputer zagrał:  ' + computerChoice + '<br>' + text);
		score(params.playerScore + ' - ' + params.computerScore);
		gameOver();

	};

	var gameOver = function () {
		var boxes = '';
		var table = document.querySelector('#table');

		if (params.playerScore == params.rounds) {
			info('<strong>WYGRAŁEŚ</strong> GRĘ, <strong>GRATULACJE!</strong>');
			params.block = true;
			log('Gra skończona, <strong>kliknij</strong> Przycisk <strong>Nowa Gra !</strong> !');

			for (var i = 0; i < params.progress.length; i++) {
				boxes += `<tr>
								<td>${params.progress[i].currentRound}.</td>	
								<td>${params.progress[i].player}</td> 
								<td>${params.progress[i].ai}</td> 
								<td>${params.progress[i].roundResult}</td> 
								<td>${params.progress[i].gameResult}</td>
							</tr>`
			}

			table.innerHTML = boxes;
			showModal('.game-over');	// iDentyfikator MODALA który ma być otwarty 
		} else if (params.computerScore == params.rounds) {
			info('<strong>PRZEGRAŁEŚ</strong> GRĘ, POWODZENIA NASTĘPNYM RAZEM !');
			params.block = true;
			log('Gra skończona, <strong>kliknij</strong> Przycisk <strong>Nowa Gra !</strong> !');

			for (var i = 0; i < params.progress.length; i++) {
				boxes += `<tr>
								<td>${params.progress[i].currentRound}.</td>	
								<td>${params.progress[i].player}</td> 
								<td>${params.progress[i].ai}</td> 
								<td>${params.progress[i].roundResult}</td> 
								<td>${params.progress[i].gameResult}</td>
							</tr>`
			}

			table.innerHTML = boxes;
			showModal('.game-over');	// iDentyfikator MODALA który ma być otwarty 

		};
	};


	for (var i = 0; i < gameButtons.length; i++) {
		gameButtons[i].addEventListener('click', function () {
			if (!params.block) {
				var attribute = this.getAttribute('data-move');
				playerMove(attribute);
			}
		})
	};


})(); 