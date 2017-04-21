// /*
 // * Licensed to the Apache Software Foundation (ASF) under one
 // * or more contributor license agreements.  See the NOTICE file
 // * distributed with this work for additional information
 // * regarding copyright ownership.  The ASF licenses this file
 // * to you under the Apache License, Version 2.0 (the
 // * "License"); you may not use this file except in compliance
 // * with the License.  You may obtain a copy of the License at
 // *
 // * http://www.apache.org/licenses/LICENSE-2.0
 // *
 // * Unless required by applicable law or agreed to in writing,
 // * software distributed under the License is distributed on an
 // * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 // * KIND, either express or implied.  See the License for the
 // * specific language governing permissions and limitations
 // * under the License.
 // */

var ownRadioId = '00000001-0001-0001-0001-000000000001',
	api = 'http://api.ownradio.ru/v3';
var apiNext = api + '/tracks/' + ownRadioId + '/next';

var currentTrack = null;
var nextTrack = null;
var media = null;
var playbackStatus = null;
var btnPlay = null;
var deviceId = ownRadioId;
var flagComplete = false;



var audio = null;//new Audio('http://api.ownradio.ru/v3/tracks/f64bfa62-acbe-4acc-b5d0-378a30bf3c80');
var isPlaying = false;
var readyStateInterval = null;



document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	console.log('ownradio ' + 'onDeviceReady()');
	initializeService();
	// var path = (window.location.pathname).substring(0, p.lastIndexOf('/'));
	// if(path == null) path = 'null';
	// alert(path);
	btnPlay = document.querySelector('#radioPlay');
	txtGroup = document.querySelector('#radioGroup');
	txtTitle = document.querySelector('#radioName');
			
	// document.querySelector("#playMp3").addEventListener("touchend", playMP3, false);
	
	btnPlay.addEventListener("click", btnPlayPause, false);
	document.querySelector("#radioNext").addEventListener("click", next, false);
	// document.querySelector("#radioName").addEventListener("touchend", name, false);
	// document.querySelector("#radioGroup").addEventListener("touchend", group, false);
	
	// var audio = document.createElement('audio'),
	
	downloadFiles();

}
function btnPlayPause(){
	if(audio != null && isPlaying){
		isPlaying = false;
		btnPlay.classList.remove('pause');
		audio.pause();
	} else {
		// isPlaying = true;
		// btnPlay.classList.add('pause');
		playTest();
	}
}
function playTest(){
	if(audio == null){
		playNextTest();
	}
	

	isPlaying = true;
	audio.play();
	audio.addEventListener("playing", function(){
		isPlaying = true;
		btnPlay.classList.add('pause');
		
	});
	audio.addEventListener("waiting", function() {
		btnPlay.classList.remove('pause');
	});
	audio.addEventListener("ended", function(){
		playNextTest();
	});
}

function playNextTest(){
	downloadFiles();
	// audio.pause();
	// audio = null;
	// audio = new Audio('http://api.ownradio.ru/v3/tracks/a18b4905-d99b-46a5-ac32-79e627438d46');
	// playTest();
	
	
	console.log('ownradio ' + 'playNext');
	dataService.getTrack(function(track){
		if(track != null){
			currentTrack = track.id;
			console.log('ownradio ' + "id:" + currentTrack);
			
			
			if(audio != null){
				audio.pause();
				audio = null;
			}
			
			
			audio = new Audio(getMediaURL() + currentTrack + ".mp3");
			txtGroup.innerHTML = track.artist;
			txtTitle.innerHTML = track.name;
			playTest();
		} else {
			downloadFiles();
		}
	});
}

function getMediaURL() {
		return cordova.file.dataDirectory + '/music/';
		
		
	// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
		// fs.root.getDirectory("music", { create: true}, function (dirEntry){ });
	// });
	
	// return "file:///android_asset/www/" + s;
		
	// console.log('getMediaURL(s)');
    // if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
	// alert(cordova.file.applicationDirectory+s);
    // return cordova.file.applicationDirectory+s;
		
        // return (window.location.pathname).substring(0, p.lastIndexOf('/')) + s;
        // console.log(this.root);
    // return "http://localhost:8000/sounds/5315ab2f-8553-44d3-8d48-cbc4ae771260.mp3";
}

// function mediaError(e) {
	// console.log('ownradio ' + 'mediaError(e)');
    // alert('Media Error');
    // alert(JSON.stringify(e));
// }

// function play(){
	// console.log('ownradio ' + 'Play');
	
	// if(media == null){
		// playNext();
		// console.log('ownradio ' + 'init media');
	// }

	// if(playbackStatus != 3){ 
		// console.log('ownradio ' + 'pause ' + playbackStatus);
		// media.pause();
	// } else {
		// console.log('ownradio ' + 'play ' + playbackStatus);
		// media.play();
	// }

	
// }

function initializeService(){
	dataService.initialize();
	
}

// function playNext(){
	// downloadFiles();
	
	
	// console.log('ownradio ' + 'playNext');
	// dataService.getTrack(function(track){
		// if(track != null){
			// currentTrack = track.id;
			// console.log('ownradio ' + "id:" + currentTrack);
			// if(media != null)
				// media.release();
			// console.log('ownradio ' + 'media.release() ' + media);
			// media = new Media(getMediaURL() + currentTrack + ".mp3",
				// function () { 
					// console.log('ownradio ' + "playAudio():Audio Success"); 
					// },
				// // error callback
				// function (err) { console.log('ownradio ' + "playAudio():Audio Error: " + err.code + " " + err.message); },
				// function (pStatus) { playbackStatus = pStatus; console.log('ownradio ' + "playAudio():Audio Status: " + playbackStatus); 
					// if(pStatus != 3) 
						// btnPlay.classList.add('pause');
					// else
						// btnPlay.classList.remove('pause');
					// // if(pStatus == 4 && flagComplete == true){
						// // console.log('ownradio ' + 'complete');
						// // flagComplete = false;
						// // playNext();
					// // }
					// // if(pStatus == 2)
						// // flagComplete = true;
				// }
				// );
							
			// txtGroup.innerHTML = track.artist;
			// txtTitle.innerHTML = track.name;
			// media.play();
			
		// } else {
			// downloadFiles();
		// }
	// });
// }

function next(){
	console.log('ownradio ' + 'next');
	playNextTest();
}

function getNextTrack(deviceId, callback){
	$.ajax({ 
		url: 'http://api.ownradio.ru/v3/tracks/' + deviceId +'/next',
		async: false
	})
    .done(function (response) {
		console.log('getNextTrack callback 1');
		callback(response);
		// dataService.setTrack(response);
    }).fail(function (jqXHR, textStatus, errorThrown) {
		console.log(errorThrown);
    }).always(function () {
		
	});
}

function getTrackById(trackInfo){
	var fileTransfer = new FileTransfer();
	var uri = encodeURI("http://api.ownradio.ru/v3/tracks/" + trackInfo.id);
	var fileURL = getMediaURL() + trackInfo.id + ".mp3";
	
	fileTransfer.download(
		uri,
		fileURL,
		function(entry) {
			console.log("download complete: " + entry.toURL());
			dataService.setTrack(trackInfo);
		},
		function(error) {
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("download error code" + error.code);
		},
		false,
		{
			headers: {
				//"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		}
	);
}

function downloadFiles(){
	getNextTrack(deviceId, function(fileInfo){
		console.log('getNextTrack callback');
		getTrackById(fileInfo);
	});
}