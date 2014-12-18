angular.module("gameApp").controller("GameController", GameController);

GameController.$inject = ['$firebase'];

function GameController($firebase){

	var game = this;

	game.startingPlayer = "player-one";
	game.currentPlayer = "player-one";
	game.playCounter = 0;
	game.scoreBoard = [0, 0, 0]; //[Ties, Player One Wins, Player Two Wins]
	game.playSquare = playSquare;
	game.board = [
		{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
		{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
		{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0}
	];

	function resetGame() {
		game.board = [
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0}
		];

		game.playCounter = 0;
		changeStartingPlayer();
	};

	function playSquare(player, i) {
		var square = game.board[i];
		if (player == "player-one"){
			if (square.owner == 0){
				square.owner = 1;
				game.playCounter += 1;
				square.played = game.playCounter;
				outcome(1);
				changeTurn();
			}
			else {
				console.log("no play available");
			}
		}
		else if (player == "player-two"){
			if (square.owner == 0){
				square.owner = 2;
				game.playCounter += 1;
				square.played = game.playCounter;
				outcome(2);
				changeTurn();
		}
			else {
				console.log("no play available");
			}
		}
	};

	function changeTurn() {
		game.currentPlayer = (game.currentPlayer == "player-one" ? "player-two" : "player-one");
	}

	function changeStartingPlayer() {
		game.startingPlayer = (game.startingPlayer == "player-one" ? "player-two" : "player-one");
	}

	function outcome(playerNum){
		if (game.board[0].owner == playerNum && game.board[0].owner == game.board[1].owner && game.board[1].owner == game.board[2].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else if (game.board[3].owner == playerNum && game.board[3].owner == game.board[4].owner && game.board[4].owner == game.board[5].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else if (game.board[6].owner == playerNum && game.board[6].owner == game.board[7].owner && game.board[7].owner == game.board[8].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else if (game.board[0].owner == playerNum && game.board[0].owner == game.board[3].owner && game.board[3].owner == game.board[6].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else if (game.board[1].owner == playerNum && game.board[1].owner == game.board[4].owner && game.board[4].owner == game.board[7].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else if (game.board[2].owner == playerNum && game.board[2].owner == game.board[5].owner && game.board[5].owner == game.board[8].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else if (game.board[0].owner == playerNum && game.board[0].owner == game.board[4].owner && game.board[4].owner == game.board[8].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else if (game.board[2].owner == playerNum && game.board[2].owner == game.board[4].owner && game.board[4].owner == game.board[6].owner){
			alert("Player " + playerNum + " wins!");
			game.scoreBoard[playerNum] += 1;
			resetGame();
		}

		else {
			checkForTie();
		}
	};

	function checkForTie(){
		var tieCheck = 0;
		for (i = 0; i < game.board.length; i++){
			if (game.board[i].owner == 0){
				tieCheck += 1;
			}
		}
			if (tieCheck == 0){
				alert("Tie Game.");
				game.scoreBoard[0] += 1;
				resetGame();
			}
	};

};