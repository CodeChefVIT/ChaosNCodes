var {transactions}=require(process.cwd()+"/db/functions/transactions.js");

module.exports={
  get:function(req,res){
      return transactions.getData(req.body.id).then(function(result){
        if(result.success==false){
          return res.render("dashboard",{message:"Error getting transactions"})
        }
        return res.render("transactions",{data:result.data,message:"Transactions found"})
      })
      .catch(function(err){
        return res.json({success:false,message:"Error getting data"})
      })
  }
}
