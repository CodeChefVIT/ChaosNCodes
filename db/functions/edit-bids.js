var {bids,listing}=require(process.cwd()+"/db/models/listings.js");

module.exports.bids={
	createBid:function(from,to,id,quantity,amount){
		return new Promise(function(resolve,reject){
			let Bid=new bids({
				by:from,
				to:to,
				listing:id,
				amounts:[
					{quantity:quantity,amount:amount,status:"none"}
				]
			});
			console.log(from)
			return Bid.save()
				.then(function(result){
					if(result.success==false){
						return resolve({success:false,message:"Error adding bid"});
					}
					console.log(result);
					return listing.findOneAndUpdate({_id:id},{$push:{bids:{bid:result._id}}});
				})
				.then(function(result){
					if(result.success==false){
						return resolve({success:false,message:"Error adding bid"});
					}
					return resolve({success:true,message:"Added bid"});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	addBid:function(id,user,quantity,amount){
		return new Promise(function(resolve,reject){
			return bids.findOneAndUpdate({$or:[{by:user},{to:user}],_id:id},{$push:{quantity:quantity,amount:amount,status:"none"}})
				.then(function(result){
					if(result==null){
						return reject({success:false,code:400,message:"Error creating bid"});
					}
					return resolve({success:true,message:"Created bid successfully",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	respondToBid:function(user,id,amount_id,status){
		return new Promise(function(resolve,reject){
			return bids.findOneAndUpdate({$or:[{by:user},{to:user}],_id:id,amounts:{$elemMatch:{_id:amount_id}}},{"amounts.$.status":status},{new:true})
				.then(function(result){
					if(result==null){
						return resolve({success:false,code:401,message:"Error getting bid"});
					}
					return resolve({success:true,message:"Responded to bid",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	getBid:function(user,bid_id,bid){
		return new Promise(function(resolve,reject){
			return bids.find({_id:bid,to:user})
				.then(function(result){
					if(result==null){
						return resolve({success:false,code:401,message:"Error getting bid"});
					}
					let amount;
					console.log(result)
					if(result.length==0){
						return resolve({success:true,message:"Found bids",data:null ,code:200});
					}
					for(i=0;i<result.amounts.length;i++){
						if(result.amounts[i]._id==bid){
							amount=result.amounts[i];
						}
					}
					return resolve({success:true,message:"Found bids",data:amount ,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	}
};
