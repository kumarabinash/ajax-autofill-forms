var xhr = false; //XMLHttpRequest Object
var dataArray = new Array();
var url = "data/state.xml"; //CHANGE THIS TO YOUR DESIRED XML FILE AND POPULATE THE XML FILE
var elementId;

document.onclick = function(){
	document.getElementById('stateSuggest').innerHTML = "";
};


function initAll(elid){
	elementId = elid.id;
	if(elementId == "state"){
		url = "data/"+elementId;		
	} else {
		var state = document.getElementById('state').value.toLowerCase();
		url = "data/" + state + "-" + elementId;
	}
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
		xhr.onreadystatechange = setDataArray;
		xhr.open("GET", url, true);
		xhr.send(null);
	} else {
		alert("Sorry, XMLHttpRequest couldn't be created. ");
	}

	searchData();

}

function setDataArray(){
	if(xhr.readyState == 4){
		if(xhr.status == 200){
			if(xhr.responseXML){
				var allData = xhr.responseXML.getElementsByTagName(elementId);
				for(var i=0; i<allData.length; i++){
					dataArray[i] = allData[i].getElementsByTagName('label')[0].firstChild;
				}
			}
		} else {
			alert("There was problem with the request " + xhr.status);
		}
	}
}

function searchData(){
	var str = document.getElementById(elementId).value;
	document.getElementById(elementId).className = "";
	if(str != ""){
		document.getElementById('stateSuggest').innerHTML = "";

		for(var i=0; i<dataArray.length; i++){
			var thisState = dataArray[i].nodeValue;

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
			document.getElementById(elementId).className = "error";
		}
	}
}

function makeChoice(evt){
	var thisDiv = (evt)? evt.target : window.event.srcElement;
	document.getElementById(elementId).value = thisDiv.innerHTML;
	dataArray = [];
	document.getElementById('stateSuggest').innerHTML = "";
}

/*function dismissPopups(evt){
	var thisbody = (evt)? evt.target : window.event.srcElement;
	document.getElementById('stateSuggest').innerHTML = "";
}*/