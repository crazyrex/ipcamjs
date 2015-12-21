# ipcamjs
Generic ipcamera patrol system controller

API based on Promise Javascript concept.
A basic usage example could be:

      var p1 = function(){
        return [
          new step(encoder(move,"preset1")).command,
          new step(encoder(velocity,slow)).command,
          new step(encoder(move,right)).command,
          new step(encoder(stop,right)).command,
          new step(encoder(move,left)).command,
          new step(encoder(stop,left)).command,
          new step(encoder(move,right)).command,
          new step(encoder(stop,right)).command,
          new step(encoder(move,left)).command,
          new step(encoder(stop,left)).command
        ]
      };
      
      require(['CameraExecutor'],function(executor){
            executor.patrol(p1);
      }
      
The executor.patrol invocation will resolve all steps defined in the array p1. The order execution is positional array based.
