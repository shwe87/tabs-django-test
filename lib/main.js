/*
This add-on will try to communicate with the Django Server created by me.
*/
var data = require("sdk/self").data;
var Request = require("sdk/request").Request;
var openTabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
var connectTo = 'http://localhost:8080/';
var tabsList = new Array();

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
  contentScriptWhen: 'ready',
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
  //contentScriptWhen: 'ready',
  onClick: onClickWidget
});


function onClickWidget(){
    /*On click show the panel with the html content with the tab's list*/
    myPanel.contentURL = data.url('myPage.html');
    //myPanel.port.emit('start','start');
    /*myPanel.port.on('ready',function(msg){
    	console.log("READY!");
    
    });*/

}

myPanel.port.on('tabsClicked',function(message){
	console.log("List Tabs!!!");
	//myPanel.show();
	listTabs();
});



myPanel.port.on('sendClicked',function(messageToSend){
	/*This is to send the tabs list to the server.*/
	/*if (messageToSend == 'noTabs'){
		listTabs();
		//myPanel.port.emit('reponse','noSend');	
	}
	console.log(messageToSend);*/
	listTabs();
	for each(var tab in tabsList){
		var URL = connectTo;
		URL = URL + 'save/' + tab.title + '|' + tab.url ;
		//console.log('URL='+URL+'\n\n\n\n\n');
		var sendMessage = Request({
		    url: URL,
		    contentType: 'text/html; charset=utf-8',
		    //overrideMimeType: "text/plain; charset=latin1",
		    onComplete: function (response) {
    			var answer = response.text;
    			myPanel.port.emit('response',response.text);
 		    }
 		});
		sendMessage.put();
	}
});


function listTabs() {
	//console.log("HERE!!");
	tabsList = new Array();
	var tabs = require("sdk/tabs");
	var counter=0;
	myPanel.port.emit('reset','reset');
	//Clean the database in DJango server
	var URL = connectTo;
	URL = URL + 'clear/all';
	var sendMessage = Request({
		url: URL,
		contentType: 'text/html; charset=utf-8',
		//overrideMimeType: "text/plain; charset=latin1",
		onComplete: function (response) {
    			var answer = response.text;
    			//myPanel.port.emit('resp',response.text);
 		}
 	});
	sendMessage.put();
	console.log('Reset');
	for each (var tab in tabs){
		var tabInfo = new Array();
		console.log(tab.url);
		tabInfo[0] = tab.url;
		tabInfo[1] = tab.title;
		tabsList[counter] = tab;
		counter++;
		//JSON.stringify(tabInfo);		//Convert the array to JSON format because the port only can send serialazable JASON messages.
		myPanel.port.emit('takeTabs',tabInfo);
	}


}  





 
