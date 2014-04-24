window.onload = initAll;
var xhr = false; //XMLHttpRequest Object
stateArray = new Array();

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
				var allStates = xhr.responseXML.getElementsByTagName('item');
			}
		}
	}
}