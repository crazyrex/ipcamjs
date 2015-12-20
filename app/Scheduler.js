define(['q', 'app/DeferredCommand', 'app/Camera'], function(Q,c,camera){
  //console.log("Scheduler deps: "+c+" - "+camera);
  var scheduler={};

  camera.credentials.login="";
  camera.credentials.pwd="";

  var stopTime = 30000;
  var moveTime = 10000;

  var velocity = "camera.control.ptz.velocity";
  var move = "camera.control.ptz.move";
  var stop = "camera.control.ptz.stop";
  var left = "left";
  var right = "right";
  var slow ="slow";
  var proxy = "http://127.0.0.1:1337/";

  var patrol = function(steps){

    var result = Q(function(){});
    steps.forEach(function (step) {
      result = result.then(step);
    });
    return result;

  }

  var preset2 = function(){
    var preset = "192.168.0.2:81/decoder_control.cgi?loginuse="+camera.credentials.login+"&loginpas="+camera.credentials.pwd+"&command=33&onestep=0&sit=33"
    var presetAction = proxy+preset;
    var presetCmd = function(){return c.defer(1,presetAction, stopTime)};

    var slowUrl = camera.methods.decode(velocity,slow);
    var slowAction=proxy+slowUrl;
    var slowCmd = function(){return c.defer(1,slowAction, 3000)};

    var rightUrl = camera.methods.decode(move,right);
    var rightAction=proxy+rightUrl;
    var rightCmd = function(){return c.defer(1,rightAction, moveTime)};

    var stopRightUrl = camera.methods.decode(stop,right);
    var stopRightAction=proxy+stopRightUrl;
    var stopRightCmd = function(){return c.defer(1,stopRightAction,stopTime)};

    var stopLeftUrl = camera.methods.decode(stop,left);
    var stopLeftAction=proxy+stopLeftUrl;
    var stopLeftCmd = function(){return c.defer(1,stopLeftAction,stopTime )};

    var leftUrl = camera.methods.decode(move,left);
    var leftAction=proxy+leftUrl;
    var leftCmd = function(){return c.defer(1,leftAction, moveTime)};

    return [presetCmd,slowCmd,rightCmd,stopRightCmd,leftCmd,stopLeftCmd];
  }


  var preset1 = function(){
    //console.log("patrol");

    var preset = "192.168.0.2:81/decoder_control.cgi?loginuse="+camera.credentials.login+"&loginpas="+camera.credentials.pwd+"&command=31&onestep=0&sit=31"

    var presetAction = proxy+preset;
    var presetCmd = function(){return c.defer(1,presetAction, stopTime)};

    var slowUrl = camera.methods.decode(velocity,slow);
    var slowAction=proxy+slowUrl;
    var slowCmd = function(){return c.defer(1,slowAction, 3000)};

    var rightUrl = camera.methods.decode(move,right);
    var rightAction=proxy+rightUrl;
    var rightCmd = function(){return c.defer(1,rightAction, moveTime)};

    var stopRightUrl = camera.methods.decode(stop,right);
    var stopRightAction=proxy+stopRightUrl;
    var stopRightCmd = function(){return c.defer(1,stopRightAction,stopTime)};

    var stopLeftUrl = camera.methods.decode(stop,left);
    var stopLeftAction=proxy+stopLeftUrl;
    var stopLeftCmd = function(){return c.defer(1,stopLeftAction,stopTime )};

    var leftUrl = camera.methods.decode(move,left);
    var leftAction=proxy+leftUrl;
    var leftCmd = function(){return c.defer(1,leftAction, moveTime)};

    //presetCmd().then(slowCmd).then(rightCmd).then(stopRightCmd).then(leftCmd).then(stopLeftCmd).done();
    return [presetCmd,slowCmd,rightCmd,stopRightCmd,leftCmd,stopLeftCmd];
  };
  scheduler.patrol = patrol;
  scheduler.preset1 = preset1;
  scheduler.preset2 = preset2;
  return scheduler;

});
