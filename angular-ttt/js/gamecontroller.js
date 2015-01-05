angular
	.module("gameApp", ['firebase'])
	.controller("GameController", GameController);

GameController.$inject = ['$firebase'];

function GameController($firebase){
	var game = this;
	var ref = new Firebase('https://tttdb.firebaseio.com');
	game.gamesRef = ref.child('gamedata');
	game.user;
	game.fbData;
	game.joinGameID;
	game.gamesList = [];
	game.playSquare = playSquare;
	game.initialize = initialize;
	game.joinGame = joinGame;
	game.getGames = getGames;
	game.gameData = {
		startingPlayer: "Player One",
		currentPlayer: "Player One",
		scoreBoard: [0,0,0],
		playCounter: 0,
		winner: "",
		gameName: "",
		openGame: true,
		hostPlayer: "Player One",
		guestPlayer: "Player Two",
		board: [
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0},
			{owner: 0, played: 0}, {owner: 0, played: 0}, {owner: 0, played: 0}
			]
		};

	getGames();

	function initialize() {
		var error;
		getGames();
		if (game.gamesList.length > 0) {
			for (i = 0; i < game.gamesList.length; i++){
				if (game.gamesList[i] == game.newname){
					error = true;
					game.nameError = "This name has been taken! Please enter a different name.";
					break;
				}
			}
			if (error != true) {
				setGame()
			}
		}
		else {
			setGame();
		}
	};

	function setGame () {
		var hostName = game.hostName;
		var myGameName = game.newname;
		var newGameRef = game.gamesRef.push(game.gameData);
		var gameID = newGameRef.key();
		var currentGameRef = new Firebase('https://tttdb.firebaseio.com/gamedata/' + gameID)
		game.fbData = $firebase(currentGameRef).$asObject();
		currentGameRef.update({
  			"gameName": myGameName,
  			"hostPlayer": hostName
		});
		game.user = "Player One";
		return game.fbData;	
	}

	function joinGame(pick) {
		var guestName = game.guestName;
		game.gamesRef.orderByChild('gameName').equalTo(pick).on('child_added', function(snapshot){
			var joinGameID = snapshot.key();
			var joinGameRef = new Firebase('https://tttdb.firebaseio.com/gamedata/' + joinGameID)
			game.fbData = $firebase(joinGameRef).$asObject();
			game.user = "Player Two";
			joinGameRef.update({
				"openGame": "false",
				"guestPlayer": guestName
			});
			return game.fbData;
		});
	};

	function getGames() {
		var list = [];
		game.gamesRef.orderByKey().limitToLast(10).on('child_added', function(snapshot){
			if (snapshot.val().openGame == true) {
				var gamesSnap = snapshot.val().gameName;
				list.unshift(gamesSnap);
			}
		});
		game.gamesList = list;
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
		function getWinner(){
			if (playerNum == 1) {
				game.fbData.winner = game.fbData.hostPlayer + " wins!";
			}
			else {
				game.fbData.winner = game.fbData.guestPlayer + " wins!"
			}
			game.fbData.scoreBoard[playerNum] += 1;
			setTimeout(function() { resetGame(); }, 3000);
		}

		if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[1].owner && game.fbData.board[1].owner == game.fbData.board[2].owner){
			getWinner();
		}

		else if (game.fbData.board[3].owner == playerNum && game.fbData.board[3].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[5].owner){
			getWinner();
		}

		else if (game.fbData.board[6].owner == playerNum && game.fbData.board[6].owner == game.fbData.board[7].owner && game.fbData.board[7].owner == game.fbData.board[8].owner){
			getWinner();
		}

		else if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[3].owner && game.fbData.board[3].owner == game.fbData.board[6].owner){
			getWinner();
		}

		else if (game.fbData.board[1].owner == playerNum && game.fbData.board[1].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[7].owner){
			getWinner();
		}

		else if (game.fbData.board[2].owner == playerNum && game.fbData.board[2].owner == game.fbData.board[5].owner && game.fbData.board[5].owner == game.fbData.board[8].owner){
			getWinner();
		}

		else if (game.fbData.board[0].owner == playerNum && game.fbData.board[0].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[8].owner){
			getWinner();
		}

		else if (game.fbData.board[2].owner == playerNum && game.fbData.board[2].owner == game.fbData.board[4].owner && game.fbData.board[4].owner == game.fbData.board[6].owner){
			getWinner();
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