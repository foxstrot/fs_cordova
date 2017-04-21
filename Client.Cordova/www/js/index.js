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

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	console.log('ownradio ' + 'onDeviceReady()');
	initializeService();
	// var path = (window.location.pathname).substring(0, p.lastIndexOf('/'));
	// if(path == null) path = 'null';
	// alert(path);
	btnPlay = document.querySelector('#radioPlay');
			
	// document.querySelector("#playMp3").addEventListener("touchend", playMP3, false);
	
	btnPlay.addEventListener("click", play, false);
	document.querySelector("#radioNext").addEventListener("click", next, false);
	// document.querySelector("#radioName").addEventListener("touchend", name, false);
	// document.querySelector("#radioGroup").addEventListener("touchend", group, false);
	
	// audio:document.createElement('audio'),

}

function getMediaURL(s) {
	return "file:///android_asset/www/" + s;
	// console.log('getMediaURL(s)');
    // if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
	// alert(cordova.file.applicationDirectory+s);
    // return cordova.file.applicationDirectory+s;
	
	
        // return (window.location.pathname).substring(0, p.lastIndexOf('/')) + s;
        // console.log(this.root);
    // return "http://localhost:8000/sounds/5315ab2f-8553-44d3-8d48-cbc4ae771260.mp3";
}

function mediaError(e) {
	console.log('ownradio ' + 'mediaError(e)');
    alert('Media Error');
    alert(JSON.stringify(e));
}



function play(){
	console.log('ownradio ' + 'Play');

	if(media == null){
		playNext();
		console.log('ownradio ' + 'init media');
	}

	if(playbackStatus != 3){ 
		console.log('ownradio ' + 'pause ' + playbackStatus);
		media.pause();
	} else {
		console.log('ownradio ' + 'play ' + playbackStatus);
		media.play();
	}

	
}

function initializeService(){
	dataService.initialize();
	
}

function playNext(){
	console.log('ownradio ' + 'playNext');
	dataService.getTrack(function(track){
		currentTrack = track.id;
		console.log('ownradio ' + "id:" + currentTrack);
		if(media != null)
			media.release();
		console.log('ownradio ' + 'media.release() ' + media);
		media = new Media("http://api.ownradio.ru/v3/tracks/" + currentTrack,
			function () { console.log('ownradio ' + "playAudio():Audio Success"); },
			// error callback
			function (err) { console.log('ownradio ' + "playAudio():Audio Error: " + err.code + " " + err.message); },
			function (pStatus) { playbackStatus = pStatus; console.log('ownradio ' + "playAudio():Audio Status: " + playbackStatus); 
			if(pStatus != 3) 
				btnPlay.classList.add('pause');
			else
				btnPlay.classList.remove('pause');
			});
			console.log('ownradio ' + 'init media to currentTrack');
			
			media.play();
	});
}

function next(){
	console.log('ownradio ' + 'next');
	playNext();
	
}

