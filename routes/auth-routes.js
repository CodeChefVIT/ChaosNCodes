var router=require("express").Router();

var {signup,generateOTP,login}=require(process.cwd()+"/controllers/auth-user.js");

router.post("/signup",function(req,res){
	return signup(req,res);
});
router.post("/login",function(req,res){
	return login(req,res);
});
router.post("/genOTP",function(req,res){
	console.log(req.body);
	return generateOTP(req,res);
});


module.exports=router;
