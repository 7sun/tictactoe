var boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var startingPlayer = "player one";
var currentPlayer = "player one";
var scoreBoard = [0, 0, 0] //[Ties, Player One Wins, Player Two Wins]
var ties = document.getElementById("ties");
var playerOneWinsCounter = document.getElementById("player-one-wins");
var playerTwoWinsCounter = document.getElementById("player-two-wins");


function resetGame() {
	var boardClass = document.getElementsByClassName("board-square")
	for (i = 0; i < boardArray.length; i++) {
		boardArray[i] = 0;
		boardClass[i].style.backgroundColor = "#ecf0f1";
		// boardClass[i].className = "board-square";
	}
	ties.innerHTML = scoreBoard[0].toString();
	playerOneWinsCounter.innerHTML = scoreBoard[1].toString();
	playerTwoWinsCounter.innerHTML = scoreBoard[2].toString();
	changeStartingPlayer();
};

function changeStartingPlayer(){
	if (startingPlayer == "player one"){
		startingPlayer = "player two";
	}
	else {
		startingPlayer = "player one";
	}
};

function changeTurn(){
	if (currentPlayer == "player one"){
		currentPlayer = "player two";
	}
	else {
		currentPlayer = "player one";
	}
};

function playSquare(squareNum, idName) {
	if (currentPlayer == "player one"){
		var square = document.getElementById(idName)
		if (boardArray[squareNum] == 0){
			boardArray[squareNum] = 1;
			square.style.backgroundColor = "#e67e22";
			// square.className = square.className + " fade";
			outcome(1);
			changeTurn();
		}
		else {
			console.log("no play available");
		}
	}
	else if (currentPlayer == "player two"){
		if (boardArray[squareNum] == 0){
			boardArray[squareNum] = 2;
			document.getElementById(idName).style.backgroundColor = "#1abc9c";
			outcome(2);
			changeTurn();
		}
		else {
			console.log("no play available");
		}
	}
};

function outcome(playerNum){
	if (boardArray[0] == playerNum && boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else if (boardArray[3] == playerNum && boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else if (boardArray[6] == playerNum && boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else if (boardArray[0] == playerNum && boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else if (boardArray[1] == playerNum && boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else if (boardArray[2] == playerNum && boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else if (boardArray[0] == playerNum && boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else if (boardArray[2] == playerNum && boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]){
		alert("Player " + playerNum + " wins!");
		scoreBoard[playerNum] += 1;
		resetGame();
	}

	else {
		checkForTie();
	}
};


function checkForTie(){
	if (boardArray.indexOf(0) == -1) {
		alert("Tie Game.");
		scoreBoard[0] += 1;
		resetGame();
	}
};