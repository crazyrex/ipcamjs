require.config({
	paths: {
		Camera: 'app/Camera',
		XhrPromise: 'app/XhrPromise',
		Scheduler: 'app/Scheduler',
		DeferredCommand: 'app/DeferredCommand',
		q: 'public/components/q/q'
	},
	shim: {
		q: 'public/components/q/q'
	},
	packages: [

	]
});


require(['q','app/Scheduler'],function(Q,scheduler){

	function* rand(){
		var index = 0;
		while(true){
			yield index = Math.floor(Math.random() * 6) + 1
		}
	}

	var presets = [scheduler.preset1,scheduler.preset2]
	var i = -1;
	function* preset(){

			while(true){
				i = (i+1)%2;
				yield presets[i];
			}
		}

 /*schedule next patrol preset*/
 var schedule = function() {
 		var pr = preset();
 		var aPFunc = pr.next().value;
 		var aP = aPFunc();
// 		console.log("scheduling patrol: "+aP);
 		return Q.fcall(scheduler.patrol(aP));
 	}

	var delay = function(t){
		return Q.delay(t);
	}

	var first = rand();

	/*wait rand seconds before execute*/
	var execute = function(){
		var t = first.next().value*1000;
	//	console.log("waiting for: "+t+" ms");
		delay(t).then(schedule);
	}

  /*execute immediately*/
	execute();
	/*and every T minutes*/
	var minutes = 30;
	var millis = minutes*60*1000;
	setInterval(execute,millis);

})
