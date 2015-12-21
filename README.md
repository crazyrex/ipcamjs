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
