/*Global variables*/
//var tabsArray = new Array();	//The array with the tabs
var counter = 0;		//The tabs counter

/*Let's handle the "send the tabs button":*/
var sendButton = document.getElementById('sendButton');	//Get the button sendButton
if (sendButton != null){
	//If the button exists then listen for an event to happen
	//console.log("BUTTON NOT NULL!!!");
	//console.log("TITULO " + document.title);
	if(sendButton.addEventListener){
		sendButton.addEventListener('click',function onClick(event){
			//If anyone clicks it then send a message to the add-on module
			console.log("CLICKED SEND!!!");
			if (counter == 0){
				var messageToSend = 'noTabs';
				//self.port.emit('sendClicked',messageToSend);
			}
			else{
				var messageToSend = tabsArray;
			}	
			self.port.emit('sendClicked',messageToSend);	
		},false);
	}else if(sendButton.attachEvent){
		sendButton.attachEvent('onClick',function onClick(event){
			//If anyone clicks it then send a message to the add-on module
			console.log("CLICKED SEND!!!");
			if (counter == 0){
				var messageToSend = 'noTabs';
				//self.port.emit('sendClicked',messageToSend);
			}
			else{
				var messageToSend = tabsArray;
			}	
			self.port.emit('sendClicked',messageToSend);	
		});
	
	
	}
}


var listButton = document.getElementById('getTabsButton');
if(listButton != null){
	/*listButton.addEventListener('click',function onClick(event){
		console.log("CLICKED!!!");
		self.port.emit('tabsClicked','noMessage');	
	},false);
	*/
	//console.log("EXISTE!!! 1 ");
	listButton.onclick=function(){
		console.log("CLICKED!!");
		self.port.emit('tabsClicked','noMessage');
	
	};
}


/*
self.port.on('start',function(message){
	if (document.addEventListener){
		console.log("HERE");
  		document.addEventListener("DOMContentLoaded", function(event){
  					console.log("LOADED");
					//var listButton = document.getElementById('getTabsButton');
					if(listButton != null){
						console.log("EXISTE!!! 2");
						listButton.addEventListener('click',function onClick(event){
							console.log("CLICKED!!!");
							self.port.emit('tabsClicked','noMessage');	
						},false);
						
						//Uncomment one os these two: Click the button or send message saying someone has clicked the button.
						listButton.click();
						
						//self.port.emit('tabsClicked','noMessage');
					//}
					
  		}, false)
  	}
  	}
  	/*
  	if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
     	// document has at least been parsed
     		/*var listButton = document.getElementById('getTabsButton');
		if(listButton != null){
			console.log("EXISTE!!! 2");
						/*listButton.addEventListener('click',function onClick(event){
							console.log("CLICKED!!!");
							self.port.emit('tabsClicked','noMessage');	
						},false);
						*/
		/*	listButton.click();
     		
		}*/
	/*	console.log("LOADED");
		self.port.emit('tabsClicked','noMessage');
	}*/
//});

//var newText = document.createElement('p');



self.port.on('response',function(answer){
	var newText = document.createElement('p');
	//var text = document.createTextNode('The answer is ' + answer);
	//newText.appendChild(text);
	//document.body.appendChild(newText);
	//if (answer == 'OK'){
	//var a = document.createElement('a');
	var django = document.getElementById('django');
	//text = document.createTextNode('Click here to see the list in DJango.');
	django.innerHTML = 'Click here to see the saved list in DJango';
	var href = document.createAttribute('href');
	href.value = 'http://localhost:8080';
	django.setAttributeNode(href);
	//document.body.appendChild(a);
	//nText = document.getElementById('django');
	//nText = 
	//nText.innerHTML = a;	
	//document.body.insertBefore(nText,sendButton);
		
	//}
	//console.log(answer);

});



//Create a list:
/*To obtain:
 * <ul>
 * <li>a tab's title</li>
 * <li>another tab's title</li>
 * </ul>
*/


self.port.on('takeTabs',function(tabs){
	var ul = document.getElementById('list');
	//var listOfLinks = document.createAttribute('id');
	//listOfLinks.value = 'listOfLinks';
	//ul.setAttributeNode(listOfLinks);
	//console.log(document.title);
	//console.log("ARRAY " + tabs);
	//var tabsInfo = JSON.parse(tabs);
	var tabsURL = tabs[0];
	var tabsName = tabs[1];
	//tabsArray[counter] = tabsURL;
	//counter = counter + 1;
	//Create a <li><a href="tab's url">tab's title</a></li>
	var li = document.createElement('li');
	a = document.createElement('a');
	href = document.createAttribute('href');
	href.value = tabsURL;
	var style = document.createAttribute('style');
	style.value = 'color:blue';
	var title = document.createTextNode(tabsName);
	a.setAttributeNode(href);
	a.setAttributeNode(style);
	a.appendChild(title);
	li.appendChild(a);
	ul.appendChild(li);
	//Insert it in the document's body, before the list button
	//document.body.insertBefore(ul,listButton);

		
});

/*List again the tabs*/
self.port.on('reset',function(message){
	var u = document.getElementById('list');
	if (u != null){
		//Remove all the "li"(tabs) elements who are child of ul
 		while (u.firstChild) {
    			u.removeChild(u.firstChild);
		}
	}
	

});




