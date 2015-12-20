define(['q', 'app/XhrPromise'], function(Q, xhr){

  var DeferredCommand = {};

  function command(id,action, duration){
    //console.log("created: "+this.id+" - "+this.action+" - "+this.duration);
    this.id= id;
    this.action = action;
    this.duration = duration;
    var instance=this;
    this.delay = function(){
        return Q.delay(instance.duration);
    }
  }

  // command.prototype.delay = function(){
  //   console.log("delay: "+this.duration+" - "+this.deferred);
  //   this._delay(this.duration,this.deferred);
  // }

  command.prototype.toString=function(){
    return ""+this.id+" - "+this.action+" - "+this.duration
  }

  command.prototype.run= function(){
    //console.log("run: "+this.id+" - "+this.action+" - "+this.duration);
    var promise = xhr.get(this.action);
    var d =  this.delay();
    /*can't cancel delay if promsise fail :(
    https://github.com/kriskowal/q/issues/64*/
    promise.then(
      function(responseText){
        //console.log(responseText);
      },
     function(err){
      return d.thenReject(err);
    })
    return d;
  }

  function deferredCmd(id,action,duration){
    //console.log('defer: '+id);
    var deferred = Q.defer();
    var aCmd = new command(id,action, duration);
    //console.log(aCmd.toString());
    aCmd.run().then(deferred.resolve,function(err){
      //console.error(err);
      deferred.reject(err);
    });
    return deferred.promise;
  }

  DeferredCommand.command = command;
  DeferredCommand.defer = deferredCmd;
  return DeferredCommand;
});
