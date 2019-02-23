$(document).ready(function(){
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
