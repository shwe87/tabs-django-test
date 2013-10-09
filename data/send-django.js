/*Global variables*/
//var tabsArray = new Array();	//The array with the tabs
var tabsList = new Array();
var counter = tabsList.length;	//The tabs counter
/*Let's handle the "send the tabs button":*/
var sendButton = document.getElementById('sendButton');	//Get the button sendButton
if (sendButton != null){
	//If the button exists then listen for an event to happen
	if(sendButton.addEventListener){
		sendButton.addEventListener('click',function onClick(event){	
		self.port.emit('sendClicked','listAndSend');	
		},false);
	}else if(sendButton.attachEvent){
		sendButton.attachEvent('onClick',function onClick(event){
		//If anyone clicks it then send a message to the add-on module
		self.port.emit('sendClicked','listAndSend');	
		});
	}
}

/*Handle the "list tabs button"*/
var listButton = document.getElementById('getTabsButton');
if(listButton != null){
	listButton.onclick=function(){
		self.port.emit('tabsClicked','noMessage');	
	};
}

/*Handle the "bookmarks" button*/
var bookmarkButton = document.getElementById('getBookmarks');
if(bookmarkButton != null){
	bookmarkButton.onclick = function(){
		self.port.emit('bookmarksClicked','noMessage');	
	};

}

/*Handle the "History" button*/
var historyButton = document.getElementById('getHistory');
if(historyButton != null){
	historyButton.onclick = function(){
		self.port.emit('historyClicked','noMessage');	
	};
}

self.port.on('takeHistory',function(listOfHistory){
	var historyUL = document.getElementById('history');
	for each(var history in listOfHistory){
		var title = history.title;
		var url = history.url;
		var visited = history.visited;
		var lastVisitedTimeInMicrosecs = history.time;
		var iconURI = history.iconURI; // is null if no favicon available
		//console.log("Script = " + history.title);
		
		
		var historyLI = document.createElement('ul');
		/*var historyType = document.createAttribute('type');
		historyType.value = 'square';
		historyLI.setAttributeNode(historyType);*/
		var historyTitle = document.createElement('li');
		//var historyTitle = document.createTextNode();
		var titleText = document.createTextNode(title);
		historyTitle.appendChild(titleText);
		var urlLI = document.createElement('li');
		var urlText = document.createTextNode(url);
		urlLI.appendChild(urlText);
		historyLI.appendChild(urlLI);
		
		
		
		var visitedLI = document.createElement('li');
		var visitedText = document.createTextNode(visited);
		visitedLI.appendChild(visitedText);
		historyLI.appendChild(visitedLI);
		
		var lastLI = document.createElement('li');
		var lastText = document.createTextNode(lastVisitedTimeInMicrosecs);
		lastLI.appendChild(lastText);
		historyLI.appendChild(lastLI);
		
		/*
		var iLI = document.createElement('li');
		var urlText = document.createTextNode(url);
		urlLI.appendChild(urlText);
		historyLI.appendChild(urlLI);*/
		historyTitle.appendChild(historyLI);
		historyUL.appendChild(historyTitle);
	
	}
});


self.port.on('takeBookmarks',function(listOfBookmarks){
	var bookmarksUL = document.getElementById('bookmarks');
	for each (var bookmark in listOfBookmarks){
		var main = bookmark.main;
		var folders = bookmark.folders;
		//var subs = bookmark.sub;
		var uris = bookmark.uri;
		//console.log("MAIN = " + main);
		//console.log("FOLDERS = " + folders);
		//console.log("SUBS = " + subs);
		//console.log("URIS = " + uris + "\r\n\r\n");
		var bookmarkMain = document.createTextNode(main);
		var bookmarkLI = document.createElement('li');
		bookmarkLI.appendChild(bookmarkMain);
		bookmarksUL.appendChild(bookmarkLI);
		/*
		<ul id='bookmarks'>
		<li> main
			<ul>
			<li>
			folder.title
				<ul>
				<li>
				subfolder
				</li>
				</ul>
			</li>
			</ul>
		</li>
		</ul>
		
		*/
		if (folders != null){
			//console.log("Hay folders " + folders);
			for each (var folder in folders){
				var folderUL = document.createElement('ul');
				var folderLI = document.createElement('li');
				var folderText = document.createTextNode(folder.title);
				folderLI.appendChild(folderText);
				folderUL.appendChild(folderLI);
				bookmarksUL.appendChild(folderUL);
				/*Now iterate it's subfolder*/
				if (folder.sub != null){
					for each (var sub in folder.sub){
						var subUL = document.createElement('ul');
						var subLI = document.createElement('li');
						var subText = document.createTextNode(sub);
						subLI.appendChild(subText);
						subUL.appendChild(subLI);
						folderUL.appendChild(subUL);
						
					
					}
				}
			
			}
		}
		/*Now show the uri of each subfolder*/
		if (uris != null){
			for each (var uri in uris){
				var uriUL = document.createElement('ul');
				var uriLI = document.createElement('li');
				var uriText = document.createTextNode(uri);
				uriLI.appendChild(uriText);
				uriUL.appendChild(uriLI);
				bookmarksUL.appendChild(uriUL);
			}
						
		}
		
	
	
	}



});


/*The following only works with cfx -o run */
self.port.on('start',function(message){
	console.log("START");
	/*if (document.addEventListener){
	//	console.log("Add Event");
  		document.addEventListener("DOMContentLoaded", function(event){
  					console.log("LOADED");
					var listButton = document.getElementById('getTabsButton');
					if(listButton != null){
						console.log("EXISTE!!! 2");
						/*listButton.addEventListener('click',function onClick(event){
							console.log("CLICKED!!!");
							self.port.emit('tabsClicked','noMessage');	
						},false);*/
						
						//Uncomment one os these two: Click the button or send message saying someone has clicked the button.
						//listButton.click();
						
						self.port.emit('tabsClicked','noMessage');
					//}
					
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
	var django = document.getElementById('django');
	django.innerHTML = 'Click here to see the saved list in DJango';
	var href = document.createAttribute('href');
	href.value = 'http://localhost:8080';
	django.setAttributeNode(href);

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
	for each (var tabsInfo in tabs){
		var tabsURL = tabsInfo.url;
		var tabsName = tabsInfo.title;
		var tabsCookie = tabsInfo.cookies;
		var tabsID = tabsInfo.id;
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
		//Create a button with it's tab's ID to be able to distinguish it later
		var b = document.createElement('BUTTON');
		var id = document.createAttribute('id');
		id.value = tabsID;
		b.setAttributeNode(id);
		var t = document.createTextNode('Cookies');
		b.appendChild(t);
		//Space up
		li.appendChild( document.createTextNode( '\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0' ) );
		li.appendChild(b);
		ul.appendChild(li);
	}

	//Make a Cookie button for each tab
	buttonsList = new Array();
	for(i=0;i<tabs.length;i++){
		buttonsList[i] = document.getElementById(tabs[i].id);
		//console.log("ID " + tabs[i].id + "  " + tabs[i].title);
		if (buttonsList[i] != null){
			buttonsList[i].addEventListener('click',function(event){
				var cookieUL = document.getElementById('cookies');
				//Clean up everything it has
				cookieUL.innerHTML = "";
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
					var cookieLI = document.createElement('li');
					var liText = document.createTextNode(cookie);
					cookieLI.appendChild(liText);	
					cookieUL.appendChild(cookieLI);			
				}
			
			});
			
		
		}
		
	}
},false);



/*Reset eveything and list again the tabs*/
self.port.on('reset',function(message){
	var u = document.getElementById('list');
	if (u != null){
		//Remove all the "li"(tabs) elements who are child of ul
 		while (u.firstChild) {
    			u.removeChild(u.firstChild);
		}
	}
	

});




