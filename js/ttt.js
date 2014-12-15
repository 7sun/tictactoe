var boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var startingPlayer = "player one";
var currentPlayer = "player one";
var squareZero = document.getElementById("square-zero"); 


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

function playSquare(x, y) {
	if (currentPlayer == "player one"){
		if (boardArray[x] == 0){
			boardArray[x] = 1;
			document.getElementById(y).style.backgroundColor = "#f00";
			playerOneOutcome();
			changeTurn();
		}
		else {
			console.log("no play available");
		}
	}
	else if (currentPlayer == "player two"){
		if (boardArray[x] == 0){
			boardArray[x] = 2;
			document.getElementById(y).style.backgroundColor = "#00f";
			playerTwoOutcome();
			changeTurn();
		}
		else {
			console.log("no play available");
		}
	}
};

function playerOneOutcome(){
	if (boardArray[0] == 1 && boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[3] == 1 && boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[6] == 1 && boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[0] == 1 && boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[1] == 1 && boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[2] == 1 && boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[0] == 1 && boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[2] == 1 && boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else {
		checkForTie();
	}
};

function playerTwoOutcome(){
	if (boardArray[0] == 2 && boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[3] == 2 && boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[6] == 2 && boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[0] == 2 && boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[1] == 2 && boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[2] == 2 && boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[0] == 2 && boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else if (boardArray[2] == 2 && boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]){
		console.log("you win!");
		changeStartingPlayer();
	}

	else {
		checkForTie();
	}
};


function checkForTie(){
	if(boardArray.indexOf(0) > -1) {
		console.log("keep playing!");
	}
	else {
		console.log("tie game");
	}
};