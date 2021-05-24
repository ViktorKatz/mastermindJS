var suitBoxTag = "smaller"
var fieldBoxTag = "medium"

var combinations = ["", "", ""];

var currentTurn = 1;

var gameOver = false;

function tick(){
	var turn = currentTurn;
	var bothTimers = document.querySelectorAll(".timer");
	var currentTimer = bothTimers[turn - 1];
	
	currentTimer.innerHTML = currentTimer.innerHTML-1;
	
	if(gameOver || currentTimer.innerHTML==0){
		alert("Isteklo je vreme igraču " + turn + ".\nPobedio je igrač " + (3-turn) + "!");
		gameOver = true;
		window.location.href = "skocko-uputstvo.html";
	}
}

function initiate(){
	combinations[1] = sessionStorage.getItem("player1combination");
	combinations[2] = sessionStorage.getItem("player2combination");
	
	if(combinations[1]==null || combinations[2]==null){
		console.log("Nisu podesene kombinacije. Vracam na podesavanja.");
		window.location.href = "skocko-podesavanja.html";
	}
	
	setInterval(tick, 1000);
}

function similarity(source, target){
	var toReturn = new Array(2);
	toReturn[0]=0;
	toReturn[1]=0;
	
	if(source.length != target.length){
		return toReturn;
	}
	
	var quantities = {};
	
	for(let i = 0; i < target.length; ++i){
		quantities[target[i]] = target[i] in quantities ? quantities[target[i]] + 1 : 1;
	}
	
	for(let i = 0; i < source.length; ++i){
		if(source[i]==target[i]){
			toReturn[0]++;
			quantities[source[i]]--;
		}
	}
	
	for(let i = 0; i < source.length; ++i){
		if(!(source[i]==target[i]) && source[i] in quantities && quantities[source[i]] > 0){
			toReturn[1]++;
			quantities[source[i]]--;
		}
	}
	
	return toReturn;
}

// Advances the cursor after a move has been made.
// Cursor is marked by the class current.
function advanceCurrentRow(){
	var currentRow = document.querySelector(".current");
	
	// First, deactivate all the field boxes
	var activeBoxes = document.querySelectorAll(".current > .boxrow75 > .box");
	for(let i = 0; i < activeBoxes.length; ++i){
		activeBoxes[i].classList.add("inactive");
	}
	
	var mySideTag = sideTag[currentTurn];
	var opposingSideTag = sideTag[3 - currentTurn];
	
	console.log(mySideTag);
	console.log(opposingSideTag);
	
	var allMyRows = document.querySelectorAll(mySideTag + " > .boxrow.compact");
	var allOpposingRows = document.querySelectorAll(opposingSideTag + " > .boxrow.compact");
	
	// Zero indexed, find current row
	for(let i = 0; i<allMyRows.length; ++i){
		if(allMyRows[i].classList.contains("current")){
			
			// If player 1 played their move, then player 2 plays in the same row.
			// If player 2 played their move, then player 1 plays in the lower row.
			var nextRowNumber = currentTurn == 1 ? i : i + 1;
			allMyRows[i].classList.remove("current");
			allOpposingRows[nextRowNumber].classList.add("current");
			break;
		}
	}
	
	// Now, activate all the field boxes of the new current row
	var inactiveBoxes = document.querySelectorAll(".current > .boxrow75 > .box");
	for(let i = 0; i < activeBoxes.length; ++i){
		inactiveBoxes[i].classList.remove("inactive");
	}
}

function attempt(questionMarkElement){
	var side = playerWhoOwns(questionMarkElement);	
	
	// If it's not my turn, return
	if(side!=currentTurn){
		return;
	}
	
	var currentRow = questionMarkElement.closest(".current");
	
	// On clicking on a question mark of an inactive row, return
	if(currentRow==null){
		return;
	}
	
	var fields = document.querySelectorAll(".current > .boxrow75 > .box.medium");
	
	var combinationString = "";
	
	for(let i=0; i < fields.length; ++i){
		if(playerWhoOwns(fields[i])!=side){
			continue;
		}
		if(suitInside(fields[i]) == 0){
			return;
		}
		combinationString+=suitInside(fields[i]);
	}
	
	var similarities = similarity(combinationString, combinations[3-currentTurn]);
	
	var feedbackBoxes = document.querySelectorAll(".current > .boxrow25.hidden > .box.tiny");
	
	console.log("Similarities = " + similarities);
	
	for(let i = 0; i < similarities[0]+similarities[1]; ++i){
		feedbackBoxes[i].classList.add( i < similarities[0] ? "correct" : "almostcorrect");
	}
	
	var questionMarkRow = questionMarkElement.closest(".boxrow25");
	var feedbackRow = document.querySelector(".current > .boxrow25.hidden");
	
	questionMarkRow.classList.add("hidden");
	feedbackRow.classList.remove("hidden");
	
	// If the game is over, display message
	if(similarities[0] == 4){
		alert("Pobedio je igrač "+ side +"!");
		gameOver = true;
		window.location.href = "skocko-uputstvo.html";
	}
	
	// Move cursor to the next player
	advanceCurrentRow();
	
	currentTurn = 3 - currentTurn;
}











