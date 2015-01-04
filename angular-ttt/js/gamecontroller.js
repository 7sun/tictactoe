angular
	.module("gameApp")
	.controller("GameController", GameController);

GameController.$inject = ['$firebase'];

function GameController($firebase){

	var game = this;
	// var ref = new Firebase('https://tttdb.firebaseio.com/gamedata');
	var ref = new Firebase('https://tttdb.firebaseio.com');
	var gamesRef = ref.child('gamedata');
	game.user;
	game.fbData;
	game.playSquare = playSquare;
	game.initialize = initialize;
	game.joinGame = joinGame;
	game.joinGameID;
	game.gameData = {
		startingPlayer: "Player One",
		currentPlayer: "Player One",
		scoreBoard: [0,0,0],
		playCounter: 0,
		winner: "",
		gameName: "",
		// hostPlayer: "",
		// guestPlayer: "",
		board: [
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0}
			]
		};


	function initialize() {
		// ref.set(game.gameData);
		var myGameName = prompt("Enter the name of your game:");
		var newGameRef = gamesRef.push(game.gameData);
		var gameID = newGameRef.key();
		var currentGameRef = new Firebase('https://tttdb.firebaseio.com/gamedata/' + gameID)
		// console.log(myGameRef)
		// var currentGameRef;
		// game.fbData = $firebase(ref).$asObject();
		// var myGame = gamesRef.orderByKey().equalTo(gameID).on('child_added', function(snapshot){
		// 		currentGameRef = snapshot.val();
		// 		console.log(currentGameRef)
		// 		return currentGameRef;
		// 	});
		// console.log(currentGameRef);
		// game.fbData = $firebase(gamesRef).$asObject();
		game.fbData = $firebase(currentGameRef).$asObject();
		currentGameRef.update({
  			"gameName": myGameName
		});
		game.user = "Player One";
		return game.fbData;
	};

	function joinGame() {
		var joinGameName = prompt("Enter the name of the game you want to join:");
		gamesRef.orderByChild('gameName').equalTo(joinGameName).on('child_added', function(snapshot){
			var joinGameID = snapshot.key();
			var joinGameRef = new Firebase('https://tttdb.firebaseio.com/gamedata/' + joinGameID)
			game.fbData = $firebase(joinGameRef).$asObject();
			game.user = "Player Two";
			return game.fbData;
		});
	};

	function resetGame() {
		game.fbData.board = [
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0}
			]
		game.fbData.playCounter = 0;
		game.fbData.winner = "";
		changeStartingPlayer();
		game.fbData.$save();
	};

	function playSquare(player, i) {
		var square = game.fbData.board[i];
		if (player == "Player One" && game.user == "Player One"){
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
		else if (player == "Player Two" && game.user == "Player Two"){
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
		game.fbData.currentPlayer = (game.fbData.currentPlayer == "Player One" ? "Player Two" : "Player One");
	};

	function changeStartingPlayer() {
		game.fbData.startingPlayer = (game.fbData.startingPlayer == "Player One" ? "Player Two" : "Player One");
	};

	function outcome(playerNum){
		if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[1].owner && game.fbData.board[1].owner == game.fbData.board[2].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		else if (game.fbData.board[3].owner == playerNum && game.fbData.board[3].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[5].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		else if (game.fbData.board[6].owner == playerNum && game.fbData.board[6].owner == game.fbData.board[7].owner && game.fbData.board[7].owner == game.fbData.board[8].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		else if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[3].owner && game.fbData.board[3].owner == game.fbData.board[6].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		else if (game.fbData.board[1].owner == playerNum && game.fbData.board[1].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[7].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		else if (game.fbData.board[2].owner == playerNum && game.fbData.board[2].owner == game.fbData.board[5].owner && game.fbData.board[5].owner == game.fbData.board[8].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		else if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[8].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		else if (game.fbData.board[2].owner == playerNum && game.fbData.board[2].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[6].owner){
			game.fbData.winner = "Player " + playerNum + " wins!";
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
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
				game.fbData.winner = "Cat's Game!";
				game.fbData.scoreBoard[0] += 1;
				setTimeout(function() { resetGame(); }, 1000);
			}
	};

};