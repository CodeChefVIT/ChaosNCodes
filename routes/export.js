var router=require("express").Router();

var auth_routes=require("./auth-routes.js");
var push=require("./insert.js");

router.use("/auth",auth_routes);
router.use("/push",push);


module.exports=router;
