define([], function(){
	/*camera default settings*/
	var camera = {};
	var host = {
		ip: '192.168.0.2',
		port: '81'
	};

	var credentials = {
		login:"",
		pwd: ""
	};

	var control = {
	    ptz : {
			velocity : {
				action: "camera_control.cgi",
				param: "100",
				slow: "1",
				mid: "5",
				fast: "10"
			},

			stop : {
				up: "3",
				down: "1",
				left: "5",
				right: "7"
			},

			move : {
				action: "decoder_control.cgi",
				up: "0",
				down: "2",
				left: "6",
				right: "4"
			}
		}
};

	var methods = function(){
		var hP = 0;

		function ptzStop(stop, value){
			cmd = "command=";
			if(value === "right"){
				cmd+=stop.right;
			}
			else if(value === "left"){
				cmd+=stop.left;
			}
			else if(value === "up"){
				cmd+=stop.up;
			}
			else if(value === "down"){
				cmd+=stop.down;
			}
			cmd+="&onestep=0";
			return cmd;
		}

		function ptzMove(move, value){
			cmd = "command=";
			if(value === "right"){
				cmd+=move.right;
			}
			else if(value === "left"){
				cmd+=move.left;
			}
			else if(value === "up"){
				cmd+=move.up;
			}
			else if(value === "down"){
				cmd+=move.down;
			}
			cmd+="&onestep=0";
			return cmd;
		}

		function ptzVelocity(velocity, value){
			cmd ="param="+velocity.param+"&";
			if(value === 'slow'){
				cmd+= "value="+velocity.slow;
			}
			else if(value === 'mid'){
				cmd+= "value="+velocity.mid;
			}
			else if(value === 'fast'){
				cmd+= "value="+velocity.fast;
			}
			return cmd;
		}

		function decode(action, value){
			var url = ""+camera.host.ip+":"+camera.host.port+"/";
			var credentials = "loginuse="+camera.credentials.login+"&loginpas="+camera.credentials.pwd;
			if(action === 'camera.control.ptz.velocity'){
				url+= camera.control.ptz.velocity.action+"?"+credentials+"&";
				url+= ptzVelocity(eval(action), value);
			}
			else if(action === 'camera.control.ptz.move'){
				url+= camera.control.ptz.move.action+"?"+credentials+"&";
				url+= ptzMove(eval(action), value);
			}
			else if(action === 'camera.control.ptz.stop'){
				url+= camera.control.ptz.move.action+"?"+credentials+"&";
				url+= ptzStop(eval(action), value);
			}
			return url;
		}

		return {decode};
	}();
	camera.host = host;
	camera.control = control;
	camera.methods=methods;
	camera.credentials=credentials;
	return camera;
})
