var mongoose=require("mongoose");

var data=new mongoose.Schema({
  key:{
    type:String,
    unique:true
  },
  temperature:{
    type:String
  },
  moisture:{
    type:String
  }
});

module.exports=mongoose.model("data",data);
