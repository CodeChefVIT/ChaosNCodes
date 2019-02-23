$(document).ready(function(){
    document.getElementById("login-form").addEventListener("submit",function(e){
      e.preventDefault();
      var xhr=new XMLHttpRequest();
      xhr.open("POST","/api/auth/login",true);
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
      xhr.send(JSON.stringify({phone:document.getElementById("phone").value,otp:document.getElementById("otp").value}));
    });

  });
