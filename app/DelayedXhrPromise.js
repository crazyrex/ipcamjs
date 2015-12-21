define(['q'], function(Q){
  var xhr = {}
  var get = function (url,delay) {
      console.info("Invoking: "+url)
      var request = new XMLHttpRequest();
      var deferred = Q.defer();

      request.open("GET", url, true);
      request.onload = onload;
      request.onerror = onerror;
      request.onprogress = onprogress;
      try{
        request.send();
      }catch(err){
        deferred.reject(err);
      }

      function onload() {
          if (request.status === 200) {
              if(typeof delay === 'number'){
                setTimeout(function(){
                    deferred.resolve(request.responseText);
                }, delay);
              }
              else{
                deferred.resolve(request.responseText);
              }
          } else {
              deferred.reject(new Error("Status code was " + request.status));
          }
      }

      function onerror() {
          deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
      }

      function onprogress(event) {
          deferred.notify(event.loaded / event.total);
      }

      return deferred.promise;
  }
  xhr.get = get;
  return xhr;
})
