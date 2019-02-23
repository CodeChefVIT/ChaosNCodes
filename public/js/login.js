$(document).ready(function(){
  document.getElementById("choice").addEventListener( 'change', function() {
    console.log(this.checked)
    console.log("trigger")
    if(this.checked) {
      document.getElementById("file").style.display="none";
      document.getElementById("login-button").value="Generate OTP";
    } else {
      document.getElementById("OTP").style.display="none";
      document.getElementById("file").style.display="block";
      document.getElementById("login-button").value="Login";
    }
  });
   document.getElementById("login-form").addEventListener("submit",function(e){
     e.preventDefault();
     var xhr=new XMLHttpRequest();
     xhr.open('POST', '/api/auth/login');
   xhr.setRequestHeader('Content-Type', 'application/json');
   xhr.onload = function() {
     console.log(xhr.response)
     var body=JSON.parse(xhr.response);
     if(body.success==false){
       document.getElementById("error").innerHTML=body.message;
     }
     else{
       window.location="/dashboard"
     }
   };
   xhr.send(JSON.stringify({
     phone: document.getElementById("phone").value,
     otp:document.getElementById("otp").value
   }));


 })

 });
