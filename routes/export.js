var router=require("express").Router();

var auth_routes=require("./auth-routes.js");

router.use("/auth",auth_routes);

module.exports=router;
