var suitBoxTag = "small"
var fieldBoxTag = "big"

function initiate(){
	sessionStorage.removeItem("player1combination");
	sessionStorage.removeItem("player2combination");
}

function obrisiSve(boxClicked){
	var side = playerWhoOwns(boxClicked);
	
	var allBigBoxes = document.getElementsByClassName(fieldBoxTag);
	
	for(let i = 0; i<allBigBoxes.length; ++i){
		if(playerWhoOwns(allBigBoxes[i])==side){
			allBigBoxes[i].innerHTML="";
		}
	}
}

function potvrdi(boxClicked){
	var side = playerWhoOwns(boxClicked);
	
	var allBigBoxes = document.getElementsByClassName(fieldBoxTag);
	
	var combination = "";
	
	for(let i = 0; i<allBigBoxes.length; ++i){
		box = allBigBoxes[i];
		if(playerWhoOwns(box)!=side)
			continue;
		combination+=suitInside(box);
	}
	
	if(combination.includes('0')){
		alert("Kombinacija mora sadrzati 4 znaka!");
		return;
	}
	
	sessionStorage.setItem("player"+side+"combination", combination);
	
	if(sessionStorage.getItem("player1combination") && sessionStorage.getItem("player2combination")){
		alert("Opaa!");
	}
	
	var boxes = document.getElementsByClassName("box");
	
	for(let i = 0; i<boxes.length; ++i){
		if(playerWhoOwns(boxes[i]) == side){
			boxes[i].classList.add("hidden");
		}
	}
	
	var checks = document.getElementsByClassName("check");
	
	for(let i = 0; i<checks.length; ++i){
		if(playerWhoOwns(checks[i]) == side){
			checks[i].classList.remove("hidden");
		}
	}
}















