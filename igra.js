var suitBoxTag = "smaller"
var fieldBoxTag = "medium"

var p1comb = "";
var p2comb = "";

var currentTurn = 2;

function initiate(){
	p1comb = sessionStorage.getItem("player1combination");
	p2comb = sessionStorage.getItem("player2combination");
	
	if(p1comb==null || p2comb==null){
		console.log("Nisu podesene kombinacije. Vracam na postavku.")
	}
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
	
	var similarities = similarity(combinationString, "1222");
	
	var feedbackBoxes = document.querySelectorAll(".current > .boxrow25.hidden > .box.tiny");
	
	feedbackBoxes = feedbackBoxes.filter(b => playerWhoOwns(b)==side);
	
	console.log(similarities);
	
	for(let i = 0; i < similarities[0]+similarities[1]; ++i){
		if(playerWhoOwns(feedbackBoxes[i])!=side){
			continue;
		}
		feedbackBoxes[i].innerHTML = i < similarities[0] ? "R" : "Y";
	}
	
	var questionMarkRow = questionMarkElement.closest(".boxrow25");
	var feedbackRow = document.querySelectorAll(".current > .boxrow25.hidden");
	
	questionMarkRow.classList.add("hidden");
	feedbackRow[side-1].classList.remove("hidden");
}











