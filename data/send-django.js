/*Global variables*/
//var tabsArray = new Array();	//The array with the tabs
var tabsList = new Array();
var counter = tabsList.length;		//The tabs counter
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


/*The following only works with cfx -o run */
self.port.on('start',function(message){
	console.log("START");
	//if (document.addEventListener){
	//	console.log("Add Event");
  	//	document.addEventListener("DOMContentLoaded", function(event){
  					console.log("LOADED");
					var listButton = document.getElementById('getTabsButton');
					if(listButton != null){
						console.log("EXISTE!!! 2");
						/*listButton.addEventListener('click',function onClick(event){
							console.log("CLICKED!!!");
							self.port.emit('tabsClicked','noMessage');	
						},false);*/
						
						//Uncomment one os these two: Click the button or send message saying someone has clicked the button.
						listButton.click();
						
						//self.port.emit('tabsClicked','noMessage');
					}
					
  		//}, false)
  	//}
  	
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
});

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
	//tabsList = tabs.slice(0);	//The best way to copy the array. Slice from element 0 to the end.
	console.log(tabsList.length);
	for each (var tabsInfo in tabs){
		var tabsURL = tabsInfo.url;
		var tabsName = tabsInfo.title;
		var tabsCookie = tabsInfo.cookies;
		var tabsID = tabsInfo.id;
		//console.log(tabsName + " COOKIES = " + tabsCookie);
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
		var b = document.createElement('BUTTON');
		var id = document.createAttribute('id');
		id.value = tabsID;
		console.log("Buttons' ID = " + id.value);
		b.setAttributeNode(id);
		var t = document.createTextNode('Cookies');
		b.appendChild(t);
		li.appendChild( document.createTextNode( '\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0' ) );
		li.appendChild(b);
		ul.appendChild(li);
	}
	//Insert it in the document's body, before the list button
	//document.body.insertBefore(ul,listButton);
	
	console.log("HERE");
	buttonsList = new Array();
	for(i=0;i<tabs.length;i++){
		buttonsList[i] = document.getElementById(tabs[i].id);
		console.log("ID " + tabs[i].id + "  " + tabs[i].title);
		if (buttonsList[i] != null){
			//console.log("NOT NULL");
			buttonsList[i].addEventListener('click',function(event){
				console.log("CLICKED BUTTON " + this.id);
				var cookieUL = document.getElementById('cookies');
				cookieUL.innerHTML = "";
				console.log(i);
				//if(cookieUL != null){console.log("1000 ");}
				
				var pos = tabs.map(function(e) { 
    					return e.id; 
    				}).indexOf(this.id);
    				var cookieCenter = document.createElement('center');
    				var cookieH1 = document.createElement('h1');
    				var ulText = document.createTextNode( tabs[pos].title + " Cookies:");
    				cookieH1.appendChild(ulText);
    				cookieCenter.appendChild(cookieH1);
				cookieUL.appendChild(cookieCenter);
				for each (var cookie in tabs[pos].cookies){
					//console.log(cookie);
					var cookieLI = document.createElement('li');
					var liText = document.createTextNode(cookie);
					cookieLI.appendChild(liText);	
					cookieUL.appendChild(cookieLI);			
				}
				//document.appendChild(cookieUL);
			
			});
			/*buttonsList[i].onclick=function(){
				//console.log("CLICKED!!");
				//self.port.emit('cookieClicked',tabsList[i].id);
				var cookieUL = document.createElement('ul');
				var ulText = document.createTextNode( tabsList[i].title + "Cookies:");
				cookieUL.appendChild(ulText);
				for each (var cookie in tabsList[i].cookies){
					var cookieLI = document.createElement('li');
					var liText = document.createTextNode(cookie);
					cookieLI.appendChild(liText);	
					ulText.appendChild(cookieLI);
				
				}
					
			};*/
		
		}
		
	}
},false);

/*Now lets create the listeners for the cookies button for each tab*/

//if (tabsList.length > 0){
/*	console.log("HERE");
	buttonsList = new Array();
	for(i=0;i<tabsList.length;i++){
		buttonList[i] = document.getElementById(tabsList[i].id);
		console.log("ID " + tabsList[i].id);
		if (buttonList[i] != null){
			console.log("NOT NULL");
			buttonList[i].onclick=function(){
				//console.log("CLICKED!!");
				//self.port.emit('cookieClicked',tabsList[i].id);
				var cookieUL = document.createElement('ul');
				var ulText = document.createTextNode( tabsList[i].title + "Cookies:");
				cookieUL.appendChild(ulText);
				for each (var cookie in tabsList[i].cookies){
					var cookieLI = document.createElement('li');
					var liText = document.createTextNode(cookie);
					cookieLI.appendChild(liText);	
					ulText.appendChild(cookieLI);
				
				}
					
			};
		
		}
		
	}


//}


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




