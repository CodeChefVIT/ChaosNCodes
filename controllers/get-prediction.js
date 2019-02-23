var prediction=require(process.cwd()+"/predictor.js")
var data=require(process.cwd()+"/db/models/data.js")

module.exports=function(req,res){
  return data.findOne({key:req.body.key}).then(function(result){
    if(result==null){
      return res.json({success:false,message:"Error fetching data"})
    }
    return prediction(result.temperature,result.moisture)
  })
  .then(function(result){
    if(result==null){
      return res.json({success:false,message:"Error predicting data"})
    }
    return res.json({success:true,message:"Found",data:result.data})
  })
  .catch(function(err){
    return res.json({success:false,message:"Application Error",code:500})
  })
}
