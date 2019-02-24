$(document).ready(function(){
  console.log("logging")
  $("#logout").on("click", function(){
      console.log("Seconf log");
    var xhr=new XMLHttpRequest();
    xhr.open("POST","/api/auth/logout",true);
    xhr.setRequestHeader("Content-type","application/json")
    xhr.onreadystatechange=function(){
        console.log(xhr)
        if(this.readyState==4){
            window.location.href="/";
        }
    }
    xhr.send(JSON.stringify({hello:1}));
  });
})
