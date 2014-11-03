define	( [ "./js/domReady.js"
		  , "./js/ALX_magictouch.js"
		  , "./js/multitouch.js"
		  ]
		, function(domReady, ALX_magictouch) {
	domReady( function() {
		 ALX_magictouch.simulateMultiTouchFromMouse(true, document.querySelector('svg'));
		 
		 document.addEventListener('touchstart', function(e) {console.log('doc touchstart', e.target);}, false)
		 E = document.getElementById("etoile");
		 E.addEventListener	( "touchstart"
							, function(e) {console.log("touch start sur etoile");
										   e.preventDefault();
										   e.stopPropagation();
										  }
							, false );
		});
});