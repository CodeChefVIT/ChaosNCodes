$(document).ready(function(){
  $('.sidenav').sidenav();
  document.getElementById("add-form").addEventListener("submit",function(e){
    e.preventDefault();
    var xhr=new XMLHttpRequest();
    xhr.open("POST","/add/createListing",true);
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

    xhr.send(JSON.stringify({product_type:document.getElementById("product_type").value,type:document.getElementById("type").value,image:"/images/"+document.getElementById("product_type").value+".jpg",date:document.getElementById("date").value,quantity:document.getElementById("quantity").value,price:document.getElementById("price").value}));
  });

});
