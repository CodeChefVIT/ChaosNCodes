$(document).ready(function(){
  document.getElementById("logout").addEventListener("click",function(){
    var xhr=new XMLHttpRequest();
    xhr.open("POST","/api/auth/logout",true);
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
    xhr.send(JSON.stringify());
  });
})
