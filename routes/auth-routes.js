var router=require("express").Router();

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/faces')
  },
  filename: function (req, file, cb) {
    req.body.face_rec="faces/"+req.body.phone+".jpg";
    cb(null, "faces/"+req.body.phone+".jpg")
  }
})

var upload = multer({ storage: storage })

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/faces')
  },
  filename: function (req, file, cb) {
    req.body.face_rec="temp/"+req.body.phone+Date.now()+".jpg";
    cb(null, "faces/"+req.body.face_rec+".jpg")
  }
})

var upload2 = multer({ storage: storage2 })


var {signup,generateOTP,login}=require(process.cwd()+"/controllers/auth-user.js");

router.post("/signup",function(req,res){
  console.log(req.body);
	return signup(req,res);
});
router.post("/login",function(req,res){
	return login(req,res);
});
router.post("/genOTP",function(req,res){
	console.log(req.body);
	return generateOTP(req,res);
});
router.post("/logout",function(req,res){
  res.clearCookie("FF");
  return res.render("home",{message:"Logged out successfully."})
})

module.exports=router;
