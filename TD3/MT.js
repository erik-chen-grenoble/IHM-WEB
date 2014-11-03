function init() {
	var divOfTouch = {};
	
	function setRandomColor(div) {
		 div.style.backgroundColor = "rgb("
								   + Math.round(Math.random()*255) + ','
								   + Math.round(Math.random()*255) + ','
								   + Math.round(Math.random()*255) + ')';
		}
	// Speech recognition
	if( window.SpeechRecognition || window.webkitSpeechRecognition ) {
		 var bt = document.createElement('button');
			bt.innerHTML = "Start speech recognition";
		 document.body.appendChild( bt );
		 bt.onclick = function() {reco.start();}

		 var SpeechReco = window.SpeechRecognition || window.webkitSpeechRecognition;
		 var reco = new SpeechReco();
			 reco.continuous = true;
			 reco.interimResults = true;
			 reco.lang = "fr-FR";

		 reco.onstart	= function() {
			 bt.innerHTML = "Stop speech recognition";
			 bt.onclick = function() {reco.stop();}
			}
		 reco.onresult	= function(event) {
			 // console.log("Speech recognized:", event);
			 for (var i = event.resultIndex; i < event.results.length; ++i) {
				 // if (event.results[i].isFinal) {
					 console.log( event.results[i][0].transcript );
					// }
				}
			}
		 reco.onerror	= function(event) {console.error("Speech recognizer error:", event);}
		 reco.onend		= function() {
			 bt.innerHTML = "Start speech recognition";
			 bt.onclick = function() {reco.start();}
			}
		
		} else {console.error("Speech recognition is not supported");}
	
	// Geolocation
	function getLocation() {
		if (navigator.geolocation) {
			 console.log("Geolocation supported");
			 var p = document.createElement('p');
			 document.body.appendChild(p);
			 navigator.geolocation.getCurrentPosition(
				function(data) {
					 p.innerHTML = "Lat: " + data.coords.latitude + "<br/>"
								 + "Lon: " + data.coords.longitude;
					}
				);
			} else	{console.error("Geolocation is not supported");
					}
		}
	getLocation();
	
	// Abonnements motion, orientation
	if (window.DeviceMotionEvent) {
		 console.log("devicemotion supported");
		 var p = document.createElement('p');
		 document.body.appendChild(p);
		 window.addEventListener( 'devicemotion'
								, function(evt) {
									 // console.log(evt);
									 var acc = evt.accelerationIncludingGravity;
									 p.innerHTML = acc.x + ";" + acc.y + ";" + acc.z;
									}
								, false);
		} else {console.error('devicemotion is not supported');}

	if (window.DeviceOrientationEvent) {
		 console.log("deviceorientation supported");
		 var p = document.createElement('p');
		 document.body.appendChild(p);
		 window.addEventListener('deviceorientation'
								, function(evt) {
									 p.innerHTML = evt.alpha + " ; " 
												 + evt.beta  + " ; " 
												 + evt.gamma;
									}
								, false);
		} else {console.error('deviceorientation is not supported');}

	// Abonnement multitouch
	document.addEventListener( 'touchstart'
							 , function(evt) {
								 evt.preventDefault();
								 var L = evt.changedTouches;
								 for(var i=0; i<L.length; i++) {
									 var touch = L.item(i);
									 // console.log(touch);
									 var div = document.createElement('div');
									 div.classList.add('doigt');
									 setRandomColor(div);
									 document.body.appendChild( div );
									 div.style.top  = (touch.pageY-16) + 'px';
									 div.style.left = (touch.pageX-16) + 'px';
									 divOfTouch[ touch.identifier ] = div;
									}
								}
							 , false);
	document.addEventListener( 'touchmove'
							 , function(evt) {
								 var L = evt.changedTouches;
								 for(var i=0; i<L.length; i++) {
									 var touch = L.item(i);
									 var div = divOfTouch[ touch.identifier ];
									 div.style.top  = (touch.pageY-16) + 'px';
									 div.style.left = (touch.pageX-16) + 'px';
									}
								}
							 , false);
	document.addEventListener( 'touchend'
							 , function(evt) {
								 var L = evt.changedTouches;
								 for(var i=0; i<L.length; i++) {
									 var touch = L.item(i);
									 var div = divOfTouch[ touch.identifier ];
									 document.body.removeChild(div);
									 delete divOfTouch[ touch.identifier ];
									}
								}
							 , false);
}
