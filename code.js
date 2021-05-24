var sideTag = ["",".p1side",".p2side"];
var selectedTag = ["", "p1selected", "p2selected"]

var suitTags=["emptySuit", "snail", "spade", "club", "diamond", "heart", "cactus"];

function suitInside(box){
	for(let i = 1; i<=6; ++i){
		var regex = new RegExp(suitTags[i]);
		if(regex.test(box.innerHTML))
			return i;
	}
	return 0;
}

function playerWhoOwns(elem){	
	for(let i=1;i<=2;++i){
		if(elem.closest(sideTag[i])!=null){
			return i;
		}
	}
	
	return 0;
}

function boxClicked(box){
	if(box.classList.contains("inactive"))
		return;
	
	var side = playerWhoOwns(box);
	var selected = document.getElementsByClassName(selectedTag[side]);
	
	if(selected.length > 1){
		console.log("Greska, nemoguce je da dva ili vise elementa budu selektovana.");
		return;
	}
	
	if(selected.length == 0){
		box.classList.add(selectedTag[side]);
		return;
	}
	
	// Now if there is one selected box
	var selectedBox = selected[0];
	selectedBox.classList.remove(selectedTag[side]);
	
	if(selectedBox==box)
		return;
	
	// If they're same type, just move the selection elsewhere
	if(selectedBox.classList.contains(suitBoxTag) == box.classList.contains(suitBoxTag)){
		box.classList.add(selectedTag[side]);
		return;
	}
	
	// If they're of different types, actually place the suit
	var suitBox = selectedBox.classList.contains(suitBoxTag) ? selectedBox : box; 
	var fieldBox = selectedBox.classList.contains(suitBoxTag) ? box : selectedBox;
	
	fieldBox.innerHTML = suitBox.innerHTML;
	
	// If it's not the last box, move the cursor
	if(fieldBox.nextElementSibling!=null)
		fieldBox.nextElementSibling.classList.add(selectedTag[side]);
}

