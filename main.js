// var requirejs = function(){
// 	var rjs = require('requirejs');
// 	if(!rjs) {
// 		return require;
// 	}
// 	else {
// 		return rjs;
// 	}
// }();

require.config({
	paths: {
		Camera: 'app/Camera',
		XhrPromise: 'app/XhrPromise',
		CameraExecutor: 'app/CameraExecutor',
		DeferredCommand: 'app/DeferredCommand',
		q: 'public/components/q/q'
	},
	shim: {
		q: 'public/components/q/q'
	},
	packages: [

	]
});


require(['q','app/CameraExecutor'],function(Q,executor){

	function* rand(){
		var index = 0;
		while(true){
			yield index = Math.floor(Math.random() * 6) + 1
		}
	}

	/*patrol presets */
	var presets = [executor.preset1,executor.preset2]

	executor.preset1().forEach(function(p){
		console.log(p.toString());
	})
	var i = -1;

	function* preset(){

			while(true){
				i = (i+1)%2;
				yield presets[i];
			}
		}

 /*execute next patrol preset*/
 var execute = function() {
 		var pr = preset();
 		var aPFunc = pr.next().value;
 		var aP = aPFunc();
 		console.log("scheduling patrol: "+aP);
 		return Q.fcall(executor.patrol(aP));
 	}

	var delay = function(t){
		return Q.delay(t);
	}

	var first = rand();

	/*wait rand seconds and schedule next execution*/
	var schedule = function(){
		var t = first.next().value*1000;
	//	console.log("waiting for: "+t+" ms");
		delay(t).then(execute);
	}


	/*and every T minutes*/
	// var minutes = 30;
	// var millis = minutes*60*1000;
	//setInterval(execute,millis);

	/*schedule immediately*/
	schedule();

	/*then loop the schedule of next patrol every random T minutes*/
	(function loop() {
    var randMinutes = Math.round(Math.random() * (60 - 10)) + 1;
		var	millis = randMinutes * 60 * 1000;
    setTimeout(function() {
            schedule();
            loop();
    }, millis);
	}());

})
