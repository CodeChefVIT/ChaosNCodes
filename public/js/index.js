if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js',{
      scope: '/'
    }).then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
let deferredPrompt;
window.addEventListener("beforeinstall",function(e){
  e.preventDefault();
  deferredPrompt=e;
  deferredPrompt.prompt();
  deferredPrompt.userChoice
    .then(function(choiceResult){
      if(choiceResult.outcome==="accepted"){
        console.log("User accepted the app install prompt")
      }
      else{
        console.log("User rejected the app install prompt")
      }
      deferredPrompt=null;
    });
  // btnAdd.style.display="block";
});
// btnAdd.addEventListener("click",function(e){
//   btnAdd.style.display="none";
//
//
// })
window.addEventListener("appinstalled",function(e){
  app.logEvent("a2hs","installed");
});
$(document).ready(function(){
  $('.sidenav').sidenav();
    let location;
    document.getElementById("signup-form").addEventListener("submit",function(e){
      e.preventDefault();
      var xhr=new XMLHttpRequest();
      xhr.open("POST","/api/auth/signup",true);
      xhr.setRequestHeader("Content-type","application/json")

      xhr.onreadystatechange=function(){
          console.log(xhr)
          if(this.readyState==4){
              var resp=JSON.parse(this.responseText);
              if(!resp.success){
                document.getElementById("error").innerHTML=resp.message;
              } else{
                window.location.href="/dashboard";
              }
          }
      }
      xhr.send(JSON.stringify({name:document.getElementById("name").value,phone:document.getElementById("name").value,otp:document.getElementById("otp").value,location:location}));
    });
    document.getElementById("loc").addEventListener("click",function(){
      console.log("Click")
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    });
    function geoSuccess(position){
      console.log(position)
      location=JSON.stringify({lat:position.coords.latitude,long:position.coords.longitude});
    }
    function geoError(err){
      document.getElementById("error").innerHTML="Error getting location";
    }
});
