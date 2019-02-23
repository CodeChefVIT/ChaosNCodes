var router=require("express").Router();
var data=require(process.cwd()+"/db/models/data.js")

router.post("/postData",function(req,res){
  let Data=new data({
    key:req.query.key,
    temperature:req.query.temp,
    moisture:req.query.moisture
  })
  return Data.save()
  .then(function(result){
    if(result==null){
      return res.json({success:false,message:"Error pushing data"})
    }
    return res.json({success:true,message:"Data pushed"})
  })
  .catch(function(err){
    return res.json({success:false,message:"Application Error"})
  })
})

module.exports=router;
