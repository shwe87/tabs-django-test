/*
This add-on will try to communicate with the Django Server created by me.
*/

//Mozilla sdk modules:
var data = require("sdk/self").data;		
var Request = require("sdk/request").Request;
var openTabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
//My modules
var bookmarks = require('./bookmark.js');
var history = require('./history.js');


//Variables
var connectTo = 'http://localhost:8080/';	//Django server's URL
var tabsList = new Array();			//A list of all tabs.



/*Open some tabs automatically, to avoid doing it manually.*/
openTabs.activeTab.url = "http://www.gmail.com";
openTabs.open("http://www.google.com");
openTabs.open("http://www.urjc.es");


/**************Panel settings*************/
var myPanel = require("sdk/panel").Panel({
  width: 800,
  height: 500,
  contentScriptFile: data.url('send-django.js'),
  contentURL: "about:blank",
  //contentScriptWhen: 'start',
  onHide: function () {
    /*On hide clear everything to go back to the main menu on show*/
    myPanel.contentURL = "about:blank";
  }
});

/**************Widget settings*************/
var myWidget = require("sdk/widget").Widget({
  id: "myWidget",
  label: "Django test",
  width:60,
  content: "Django!",
  panel: myPanel,
  contentScriptWhen: 'ready',
  onClick: onClickWidget
});


function onClickWidget(){
    /*On click show the panel with the html content with the tab's list*/
    myPanel.contentURL = data.url('myPage.html');
    myPanel.port.emit('start','start');
    //myPanel.show();
    /*console.log("READY!");
    myPanel.on('show',function(panel) {
	console.log("Panel is showing");
	
});
    //myPanel.port.emit('start','start');
    /*myPanel.port.on('ready',function(msg){
    	console.log("READY!");
    
    });*/

}

myPanel.port.on('tabsClicked',function(message){
	//The content-script lets know the add-on that the user has clicked the list button.
	//So call ths function listTabs
	tabsList = listTabs();
});



myPanel.port.on('sendClicked',function(messageToSend){
	/* Content-script lets know the add-on
	 * that the user has clicked the list & send button.
	 * This is to send the tabs' information to the server.*/
	//console.log("SEND CLICKED!!!!");
	tabsList = listTabs();	//First get the open tabs' information.
	for each(var tab in tabsList){
		var URL = connectTo;
		// Create the correct URL to save the tab's info:
		URL = URL + 'save/' + tab.title + '|' + tab.url ;
		var sendMessage = Request({
		    url: URL,
		    contentType: 'text/html; charset=utf-8',
		    onComplete: function (response) {
    			var answer = response.text;
    			//Send the server's response to the content-script to handle it.
    			myPanel.port.emit('response',response.text);	
 		    }
 		});
		sendMessage.put();	//Put the message on the server.
	}
});

/* //This works only when the onHide function is not used.
myPanel.on('show',function(panel) {
	console.log("Panel is showing");
	myPanel.port.emit('start','start');
});
*/

myPanel.port.on('bookmarksClicked',function(message){
	var listOfBookmarks = getBookmarks();
	myPanel.port.emit('takeBookmarks',listOfBookmarks);


});

//If get history button is clicked:
myPanel.port.on('historyClicked',function(message){
	var listOfHistory = getHistory();
	myPanel.port.emit('takeHistory',listOfHistory);


});

function listTabs() {
	var listOfTabs = new Array();
	var tabs = require("sdk/tabs");
	myPanel.port.emit('reset','reset');
	//Clean the database in DJango server
	var URL = connectTo;
	URL = URL + 'clear/all';
	var sendMessage = Request({
		url: URL,
		contentType: 'text/html; charset=utf-8',
		onComplete: function (response) {
    			var answer = response.text;
 		}
 	});
	sendMessage.put();
	var numberOfTabs = tabs.length;
	var countTabs = 0;
	//For each tab handle the tab's info:
	for each (var tab in tabs){
		//Create object with all the info as a  serialazable JSON message
		var info = new Object();
		info.id = tab.id;
		info.title = tab.title;
		info.url = tab.url;		
		listOfTabs.push(info);
		//JSON.stringify(tabInfo);		//Convert the array to JSON format because the port only can send serialazable JASON messages.
		//A tab's worker, used to get information and work on the tab.
		worker = tab.attach({
    			contentScriptFile: data.url("tab-access.js")
   		});
   		// Ask the worker's content-script for tab's cookies 
    		worker.port.emit('giveCookies',tab.id);
    		worker.port.on('takeCookies',function(cookiesInfo){
    			countTabs++;
    			//Ths last element of the cookie's content-script is the tabs id.
    			var thisTabsId = cookiesInfo.pop();
    			//Lets search for the tab with thisTabsId in the listOfTabs.
    			var pos = listOfTabs.map(function(e) { 
    				return e.id; 
    			}).indexOf(thisTabsId);
    			
    			//Once we have got the position of the tab with the id, lets save its cookies:
    			listOfTabs[pos].cookies = cookiesInfo;
    			 			
			/*If we have saved information of all the tabs then send it to the content-script*/
			if(countTabs == numberOfTabs){
				myPanel.port.emit('takeTabs',listOfTabs);
			}
		}); 
		
	}
	return listOfTabs;
}


function getBookmarks(){
	
	var folderIds = bookmarks.getFoldersId();
	var allBookmarks = new Array();
	for each (var id in folderIds){
		//var b = new Array();
		var uri = new Array();
		
		var folders = new Array();
		//console.log("New sub Array");
		//var sub = new Array();
		//console.log("New b");
		var b = {};
		//console.log("Main = " + bookmarks.nameFolder(id));
		//b.push(bookmarks.nameFolder(id));
		b.main = bookmarks.nameFolder(id);
		var children = bookmarks.getFoldersChildren(id);
		// children will be an array of all the children of the folder:
		for (j=0;j<children.length;j++){
			//console.log("New URI ARRAY");
			//var uri = new Array();
			//var folder = new Array();
			//var sub = new Array();
			var ifURI = bookmarks.ifUri(children[j]);
			var ifSubFolder = bookmarks.ifSubFolder(children[j]);
			if (ifURI == true){
				//b.push(children[j].title);
				//console.log("URI = " + children[j].title);
				uri.push(children[j].title);			
			}
			else if (ifSubFolder == true){
				//console.log("New folder Array");
				var folder = {};
				//var folder = new Array();
				folder.title = children[j].title;
				//folder.push(children[j].title); 
				//b.folder = children[j].title;
				//console.log("New sub Array");
				var sub = new Array();
				//b.push(children[j].title);
				//console.log("SubFolder = " + children[j].title);
				var allChildren = bookmarks.getSubFoldersBookmarks(children[j]);
				for(k=0;k<allChildren.length;k++){
					sub.push(allChildren[k].title);
					//b.push(allChildren[k].title);
					//console.log("Sub = " + allChildren[k].title);
				}
				folder.sub = sub.slice(0);
				folders.push(folder);
			}
		
	
		}
		b.uri = uri.slice(0);
		b.folders = folders.slice(0);
		//b.sub = sub.slice(0);
		allBookmarks.push(b);
		//console.log(JSON.stringify(allBookmarks));

	}
	return allBookmarks;

}

function getHistory(){
	var listOfHistory = history.queryHistory();
	console.log(listOfHistory.title);
	return listOfHistory;




}





 
