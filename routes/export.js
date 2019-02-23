var router=require("express").Router();

var auth_routes=require("./auth-routes.js");
var push=require("./insert.js");

var {addBid}=require(process.cwd()+"/controllers/bids.js")

router.use("/auth",auth_routes);
router.use("/push",push);

router.post("/postbid",function(req,res){
  console.log(req.body)
  return addBid(req,res);
})

module.exports=router;
