var router=require("express").Router();

var auth_routes=require("./auth-routes.js");
var push=require("./insert.js");

var {addBid}=require(process.cwd()+"/controllers/bids.js")
var {postBid,addToBid}=require(process.cwd()+"/controllers/bids.js")
var jwt=require("jsonwebtoken")
function authorise(req,res,next){
  let token=req.cookies["FF"];
  return jwt.verify(token,process.env.JWT_SECRET,function(err,result){
    if(err){
        return res.redirect("login");
    }
    if(result.id==undefined){
      return res.redirect("login");
    }
    req.body.id=result.id;
    req.body.name=result.name;
    next()
  });
}

router.use("/auth",auth_routes);
router.use("/push",push);

router.post("/postbid",authorise,function(req,res){
  console.log(req.body)
  return addBid(req,res);
})
router.post("/respond",authorise,function(req,res){
  return postBid(req,res);
})

router.post("/addToBid",authorise,function(req,res){
  return addToBid(req,res);
})
module.exports=router;
