module.exports=function(){
  if(process.env.DB_URL==undefined){
    process.env.DB_URL="mongodb://localhost:27017/hack";
  }
  if(process.env.JWT_SECRET==undefined){
    process.env.JWT_SECRET="nuc3un9jrnoj";
  }
}
