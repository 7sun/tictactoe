angular
	.module("gameApp")
	.controller("GameController", GameController);

GameController.$inject = ['$firebase'];

function GameController($firebase){

	var game = this;
	var ref = new Firebase('https://tttdb.firebaseio.com/gamedata');
	game.user;
	game.fbData;
	game.playSquare = playSquare;
	game.initialize = initialize;
	game.joinGame = joinGame;
	game.gameData = {
		startingPlayer: "player-one",
		currentPlayer: "player-one",
		scoreBoard: [0,0,0],
		playCounter: 0,
		// hostPlayer: "",
		// guestPlayer: "",
		board: [
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0}
			]
		};

	function initialize() {
		ref.set(game.gameData);
		game.fbData = $firebase(ref).$asObject();
		game.user = "player-one"
		return game.fbData;
	};

	function joinGame() {
		game.fbData = $firebase(ref).$asObject();
		game.user = "player-two"
		return game.fbData;
	};

	function resetGame() {
		game.fbData.board = [
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0}
			]
		game.fbData.playCounter = 0;
		changeStartingPlayer();
		game.fbData.$save();
	};

	function playSquare(player, i) {
		var square = game.fbData.board[i];
		console.log(square)
		if (player == "player-one" && game.user == "player-one"){
			if (square.owner == 0){
				square.owner = 1;
				game.fbData.playCounter += 1;
				square.played = game.fbData.playCounter;
				outcome(1);
				changeTurn();
			}
			else {
				console.log("no play available");
			}
		}
		else if (player == "player-two" && game.user == "player-two"){
			if (square.owner == 0){
				square.owner = 2;
				game.fbData.playCounter += 1;
				square.played = game.fbData.playCounter;
				outcome(2);
				changeTurn();
		}
			else {
				console.log("no play available");
			}
		}
		game.fbData.$save();
	};

	function changeTurn() {
		game.fbData.currentPlayer = (game.fbData.currentPlayer == "player-one" ? "player-two" : "player-one");
	};

	function changeStartingPlayer() {
		game.fbData.startingPlayer = (game.fbData.startingPlayer == "player-one" ? "player-two" : "player-one");
	};

	function outcome(playerNum){
		if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[1].owner && game.fbData.board[1].owner == game.fbData.board[2].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else if (game.fbData.board[3].owner == playerNum && game.fbData.board[3].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[5].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else if (game.fbData.board[6].owner == playerNum && game.fbData.board[6].owner == game.fbData.board[7].owner && game.fbData.board[7].owner == game.fbData.board[8].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[3].owner && game.fbData.board[3].owner == game.fbData.board[6].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else if (game.fbData.board[1].owner == playerNum && game.fbData.board[1].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[7].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else if (game.fbData.board[2].owner == playerNum && game.fbData.board[2].owner == game.fbData.board[5].owner && game.fbData.board[5].owner == game.fbData.board[8].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[8].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else if (game.fbData.board[2].owner == playerNum && game.fbData.board[2].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[6].owner){
			alert("Player " + playerNum + " wins!");
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 1000);
		}

		else {
			checkForTie();
		}
	};

	function checkForTie(){
		var tieCheck = 0;
		for (i = 0; i < game.fbData.board.length; i++){
			if (game.fbData.board[i].owner == 0){
				tieCheck += 1;
			}
		}
			if (tieCheck == 0){
				alert("Tie Game.");
				game.fbData.scoreBoard[0] += 1;
				setTimeout(function() { resetGame(); }, 1000);
			}
	};

};