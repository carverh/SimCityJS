console.log("BOOTED");
var express = require('express');
var fileUpload = require('express-fileupload');
var userTotal = 0;
console.log("GOT EXPRESS");
var app = express();
//var lastMsg = "";
//var fileIO = require('socket.io-file');
console.log("GOT APP");
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var sleep = require('sleep');
//var allMessage = ""
console.log("GOT SOCKET+HTTP");
app.use(express.static('.'));
console.log("STATIC");
app.use(fileUpload());
var fs = require('fs');


io.on('connection', function(socket){
		userTotal += 1;
  		console.log('[USER] connected');
  		console.log('[USER] count: '+userTotal);
 		socket.on('disconnect', function(){
   			console.log('[USER] disconnected');
   			userTotal -= 1;
   			console.log('[USER] count: '+userTotal);
 	});
});

function bubbleSort(array,key,length){
	if(array != undefined){
		for(var i = 0; i <length; i++){
			for(var j = 0; j <length; j++){
				if(array[j] == undefined || array[j+1] == undefined){
					
				}else{
					if(array[j] == undefined){
						console.log("UNDEFINED STILL!!!!");
					}
					if(array[j][key] == undefined){
						array[j][key] = 0;
					}
					if (array[j+1] == undefined)
					{
						console.log("array[j+1] is UNDEFINED");
					}
					if(array[j][key] < array[j+1][key]){
						temp = {};
						temp = players[j+1];
						array[j+1] = array[j];
						array[j] = temp;
					}
				}
			}
		}
		return array;
	}
}


http.listen(1341);

console.log("FINISHED");
