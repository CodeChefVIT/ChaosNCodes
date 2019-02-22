var mongoose=require("mongoose");

var config=require("./config.js");
var app=require(process.cwd()+"/app.js");

config()

var {listings,bids}=require(process.cwd()+"/db/models/listings.js")


mongoose.connect(process.env.DB_URL,function(err,result){
  if(err){
    console.log("Error connecting to database");
  }
  app.listen(process.env.PORT || 3000);
});
