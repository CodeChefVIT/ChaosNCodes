window.onload=function(){
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
}
