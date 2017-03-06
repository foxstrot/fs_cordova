/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
	

};

app.initialize();*/

var flag_play = false;
var currentTrack = null;
var nextTrack = null;
var media = null;
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	console.log('onDeviceReady()');
	// var path = (window.location.pathname).substring(0, p.lastIndexOf('/'));
	// if(path == null) path = 'null';
	// alert(path);
	document.querySelector("#playMp3").addEventListener("touchend", playMP3, false);
	
	
	document.querySelector("#radioPlay").addEventListener("touchend", play, false);
	// document.querySelector("#radioNext").addEventListener("touchend", next, false);
	// document.querySelector("#radioName").addEventListener("touchend", name, false);
	// document.querySelector("#radioGroup").addEventListener("touchend", group, false);
	
	// audio:document.createElement('audio'),

};

function playMP3() {
	console.log('playMP3()');
    var mp3URL = getMediaURL("sounds/5315ab2f-8553-44d3-8d48-cbc4ae771260.mp3");
    var media = new Media(mp3URL, null, mediaError);
    // var media = new Media("http://api.ownradio.ru/v3/tracks/0a58E548-4C24-4831-b55e-252af5301181", null, mediaError);
	console.log(typeof(media));
    media.play();
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
	console.log('mediaError(e)');
    alert('Media Error');
    alert(JSON.stringify(e));
}



function play(){
	console.log('Play');
		console.log(flag_play);
	
	if(media == null){
		// var mp3URL = getMediaURL("sounds/5315ab2f-8553-44d3-8d48-cbc4ae771260.mp3");
		// media = new Media(mp3URL, null, mediaError);
		media = new Media("http://api.ownradio.ru/v3/tracks/0a58E548-4C24-4831-b55e-252af5301181", null, mediaError);
		console.log('init media');
	}
	if(flag_play){
		flag_play = false;
		media.pause();
		console.log('pause' + flag_play);
	}else {
		flag_play = true;
		media.play();
		console.log('play' + flag_play);
	}
		
	// if(!currentTrack && nextTrack){
		// if(play){
			// play = false;
			// media.pause();
			// console.log('pause');
		// }
		
		// currentTrack = Object.assign()
		// var mp3URL = getMediaURL("sounds/5315ab2f-8553-44d3-8d48-cbc4ae771260.mp3");
		// var media = new Media(mp3URL, null, mediaError);
	// }
	
	// if(currentTrack){
		// play = !prm.play;
		// if(prm.play){
			// media.play();
			// obj.play.classList.add('play');
		// }else{
			// media.pause();
			// obj.play.classList.remove('pause');
		// }
	// }
	
}

// function next (){
	// if(loadNext){
		// waitNext = true;
	// } else if(nextTrack){
		// waitNext = true;
		// nextTrack();
	// }else{
		// if(currentTrack){
			// var 
		// }
	// }
// }


// function guid() {
  // function s4() {
    // return Math.floor((1 + Math.random()) * 0x10000)
      // .toString(16)
      // .substring(1);
  // }
  // return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    // s4() + '-' + s4() + s4() + s4();
// }

// function getCookie(name) {
  // var matches = document.cookie.match(new RegExp(
    // "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  // ));
  // return matches ? decodeURIComponent(matches[1]) : undefined;
// }

// function saveUid(uid){
	// var date = new Date;
	// date.setTime(date.getTime() + (60*24*60*60*1000));
	// document.cookie = 'ownRadioId='+uid+'; expires='+date.toUTCString()+'; path=/';
	// localStorage.setItem('ownRadioId', uid);
	// sessionStorage.setItem('ownRadioId', uid);
// }

// function loadUid(){
	// var cookie = getCookie('ownRadioId'),
		// local = localStorage.getItem('ownRadioId'),
		// session = sessionStorage.getItem('ownRadioId'),
		// uid = cookie || local || session || null;

	// if( (!cookie || !local || !session) && uid){
		// saveUid(uid);
	// }

	// return uid;
// }

// var ownRadioId = loadUid(),
	// api = 'http://api.ownradio.ru/v3';

// if(!ownRadioId){
	// ownRadioId = guid();
	// saveUid(ownRadioId);
// }

// var apiNext = api+'/tracks/'+ownRadioId+'/next';

// console.log('deviceId: '+ownRadioId);


// function player(){
	// var obj = {
			// play:document.querySelector('#radioPlay'),
			// next:document.querySelector('#radioNext'),
			// audio:document.createElement('audio'),
			// name:document.querySelector('#radioName'),
			// group:document.querySelector('#radioGroup')
		// },
		// prm = {
			// play:false,
			// loading:false,
			// currentTrack:null,
			// nextTrack:null,
			// intNext:null,
			// loadNext:false,
			// waitNext:false,
			// ended:false
		// },
		// fnc = {
			// play:function(){
				// console.log('play');
				// if(!prm.currentTrack && prm.nextTrack){
					// if(prm.play){
						// prm.play = false;
						// media.pause();
						// console.log('play');
						// // obj.audio.pause();
					// }

					// prm.currentTrack = Object.assign({},prm.nextTrack);
					// prm.ended = false;
					// // prm.nextTrack = null;
					// // fnc.nextTrack();

					// // obj.name.innerHTML = prm.currentTrack.name;
					// // obj.group.innerHTML = prm.currentTrack.artist;

					// // obj.audio.src = api+'/tracks/'+prm.currentTrack.id;
					// var mp3URL = getMediaURL("sounds/5315ab2f-8553-44d3-8d48-cbc4ae771260.mp3");
					// var media = new Media(mp3URL, null, mediaError);
   
    
				// }

				// if(prm.currentTrack){
					// prm.play = !prm.play;
					// if(prm.play){
						// // obj.audio.play();
						// media.play();
						// obj.play.classList.add('pause');
					// }else{
						// // obj.audio.pause();
						// media.pause();
						// obj.play.classList.remove('pause');
					// }
				// }
			// },
			// next:function(){
				// if(prm.loadNext){
					// prm.waitNext = true;
				// }else if(!prm.nextTrack){
					// prm.waitNext = true;
					// fnc.nextTrack();
				// }else{
					// if(prm.currentTrack){
						// var xhr = new XMLHttpRequest(),
							// date = new Date,
							// dateFormat = date.getFullYear()+'-'+(date.getMonth()<9?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+date.getDate()+"T"+
										// (date.getHours()<10?'0'+date.getHours():date.getHours())+':'+
										// (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())+':'+
										// (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()),
							// data = new FormData();
						// data.append('isListen',(prm.ended?'1':'-1'));
						// data.append('methodid',prm.currentTrack.methodid);
						// data.append('lastListen',dateFormat);
						// /*	json = JSON.stringify(
								// {
									// isListen:prm.ended?'1':'-1',
									// methodid:prm.currentTrack.methodid,
									// lastListen:dateFormat
								// }
							// );*/
						// xhr.open("POST", api+'/histories/'+ownRadioId+'/'+prm.currentTrack.id, true);
						// //xhr.setRequestHeader('Content-Type', 'multipart/form-data; charset=utf-8');
						// xhr.onreadystatechange = function(){
							// if (xhr.readyState != 4) return;

							// //console.log(xhr);

							// if(xhr.status == 200){
								// console.log('Данные о треке записаны в историю');
								
							// }else{
								// console.log('Ошибка отправки данных о треке.');

							// }
						// }
						// xhr.send(data);
					// }

					// prm.waitNext = false;
					// prm.currentTrack = null;
					// fnc.play();
				// }
			// },
			// ended:function(){
				// prm.ended = true;
				// prm.play = false;
				// fnc.next();
			// },
			// nextTrack:function(){
				// if(!prm.loadNext){
					// prm.loadNext = true;
					// var xhr = new XMLHttpRequest();
					// xhr.open('GET', apiNext, true);
					// xhr.onreadystatechange = function(){
						// if (xhr.readyState != 4) return;

						// prm.loadNext = false;

						// if(xhr.status == 200){
							// prm.nextTrack = JSON.parse(xhr.response);

							// if(!prm.currentTrack){
								// //todo
								// if (obj.name == null) {
									// fnc.init();									
								// }
								// if (obj.name != null) {
									// obj.name.innerHTML = prm.nextTrack.name;
									// obj.group.innerHTML = prm.nextTrack.artist;
								// }								
							// }

							// if(prm.waitNext){
								// fnc.next();
							// }
						// }else{
							// console.log('Ошибка получения данных с сервера.');
							// console.log(xhr);
						// }
					// }
					// xhr.send();
				// }
			// },
			// init: function() {
				// obj = {
					// play:document.querySelector('#radioPlay'),
					// next:document.querySelector('#radioNext'),
					// audio:document.createElement('audio'),
					// name:document.querySelector('#radioName'),
					// group:document.querySelector('#radioGroup')
				// };
				// if (obj.play != null) {
					// obj.play.addEventListener('click', fnc.play);
					// obj.next.addEventListener('click', fnc.next);
					// obj.audio.onended = fnc.ended;

					// obj.name.addEventListener('click', function(){
						// var data = prm.currentTrack || prm.nextTrack;
						// console.log(data);
					// });
				// }
			// }
		// }

	
	// fnc.init();
	// fnc.nextTrack();

	// return fnc;
// }

// var player = player();