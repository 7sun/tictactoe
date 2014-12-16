var boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var startingPlayer = "player one";
var currentPlayer = "player one";
// var squareZero = document.getElementById("square-zero"); 


function resetGame() {
	var divs = document.getElementsByTagName("div")
	for (i = 0; i < boardArray.length; i++) {
		boardArray[i] = 0;
		divs[i].style.backgroundColor = "#000";
	}
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
		if (boardArray[squareNum] == 0){
			boardArray[squareNum] = 1;
			document.getElementById(idName).style.backgroundColor = "#f00";
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
			document.getElementById(idName).style.backgroundColor = "#00f";
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
		resetGame();
	}

	else if (boardArray[3] == playerNum && boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]){
		alert("Player " + playerNum + " wins!");
		resetGame();
	}

	else if (boardArray[6] == playerNum && boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]){
		alert("Player " + playerNum + " wins!");
		resetGame();
	}

	else if (boardArray[0] == playerNum && boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]){
		alert("Player " + playerNum + " wins!");
		resetGame();
	}

	else if (boardArray[1] == playerNum && boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]){
		alert("Player " + playerNum + " wins!");
		resetGame();
	}

	else if (boardArray[2] == playerNum && boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]){
		alert("Player " + playerNum + " wins!");
		resetGame();
	}

	else if (boardArray[0] == playerNum && boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]){
		alert("Player " + playerNum + " wins!");
		resetGame();
	}

	else if (boardArray[2] == playerNum && boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]){
		alert("Player " + playerNum + " wins!");
		resetGame();
	}

	else {
		checkForTie();
	}
};


function checkForTie(){
	if (boardArray.indexOf(0) == -1) {
		alert("Tie Game.");
		resetGame();
	}
};