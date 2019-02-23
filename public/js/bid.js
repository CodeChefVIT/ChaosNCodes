$(document).ready(function(){
  document.getElementById("place").addEventListener("submit",function(e){
    e.preventDefault();
    var xhr=new XMLHttpRequest();
    xhr.open("POST","/api/postbid",true);
    xhr.setRequestHeader("Content-type","application/json")
    console.log("Sending")
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
    let params = (new URL(document.location)).searchParams;
    xhr.send(JSON.stringify({to:params.get("by"),listing:params.get("id"),amount:document.getElementById("price").value,quantity:document.getElementById("quantity").value}))
    });
});
