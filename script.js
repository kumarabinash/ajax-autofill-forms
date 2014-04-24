window.onload = initAll;
var xhr = false; //XMLHttpRequest Object
var stateArray = new Array();

function initAll(){
	if(window.XMLHttpRequest){  
		xhr = new XMLHttpRequest();
	} else {
		if(window.ActiveXObject){  //for  < = ie 6
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) { }
		}
	}

	if(xhr){
		xhr.onreadystatechange = setStatesArray;
		xhr.open("GET", "states.xml", true);
		xhr.send(null);
	} else {
		alert("Sorry, XMLHttpRequest couldn't be created. ");
	}

	document.getElementById('state').onkeyup = searchStates;

}

function setStatesArray(){
	if(xhr.readyState == 4){
		if(xhr.status == 200){
			if(xhr.responseXML){
				var allStates = xhr.responseXML.getElementsByTagName('state');
				for(var i=0; i<allStates.length; i++){
					stateArray[i] = allStates[i].getElementsByTagName('label')[0].firstChild;
				}
			}
		} else {
			alert("There was problem with the request " + xhr.status);
		}
	}
}

function searchStates(){
	var str = document.getElementById('state').value;
	document.getElementById('state').className = "";
	if(str != ""){
		document.getElementById('stateSuggest').innerHTML = "";

		for(var i=0; i<stateArray.length; i++){
			var thisState = stateArray[i].nodeValue;

			if(thisState.toLowerCase().indexOf(str.toLowerCase()) == 0){
				var tempDiv = document.createElement("div");
				tempDiv.innerHTML = thisState;
				tempDiv.onclick = makeChoice;
				tempDiv.className = "suggestions";
				document.getElementById('stateSuggest').appendChild(tempDiv);
			}
		}

		var foundState = document.getElementById('stateSuggest').childNodes.length;
		if(foundState == 0){
			document.getElementById('state').className = "error";
		}
	}
}

function makeChoice(evt){
	var thisDiv = (evt)? evt.target : window.event.srcElement;
	document.getElementById('state').value = thisDiv.innerHTML;
	document.getElementById('stateSuggest').innerHTML = "";
}