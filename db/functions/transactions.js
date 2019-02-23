var {bids,listing}=require(process.cwd()+"/db/models/listings.js");

module.exports.transactions={
  getData:function(id){
    return new Promise(function(resolve,reject){
      return bids.find({$or:[{to:id},{by:id}]}).populate([{path:"listing",select:"name price image product_type type by"}])
        .then(function(result){
          if(result==null){
            return resolve({success:false,message:"Error getting data"})
          }
          return resolve({success:true,message:"Found data",data:result})
        })
        .catch(function(err){
          console.log(err);
          return reject({success:false,message:"Application Error",code:500});
        });
    })
  }
}
