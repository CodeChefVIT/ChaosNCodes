var {listing}=require(process.cwd()+"/db/models/listings.js");

module.exports.listingFunctions={
  changeQuantity:function(listing,quantity){
    return new Promise(function(resolve,reject){
      return listing.findOneAndUpdate({_id:listing},{$inc:{current_quantity:-quantity}})
      .then(function(result){
        if(result==null){
          return resolve({success:false,code:401,message:"Error changing bid"})
        }
        return resolve({success:true,message:"Changed quantity",data:result,code:200});
      })
      .catch(function(err){
        console.log(err);
        return reject({success:false,message:"Application Error",code:500});
      });
  })
}
}
