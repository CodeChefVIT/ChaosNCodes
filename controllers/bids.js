var {user}=require(process.cwd()+"/db/functions/auth-user.js");
var {bids}=require(process.cwd()+"/db/functions/edit-bids.js");
var {listingFunctions}=require(process.cwd()+"/db/functions/listings.js");

module.exports={
	addBid:function(req,res){
		if(req.body.to==undefined || req.body.listing==undefined || req.body.quantity==undefined || req.body.amount==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		// return user.checkVerify(req.session.user_id)
		// 	.then(function(result){
		// 		if(result.success==false){
		// 			return res.json({success:false,message:"Please verify your account",code:401});
		// 		}
				return bids.createBid(req.body.id,req.body.to,req.body.listing,req.body.quantity,req.body.amount)
			// })
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error adding bid",code:401});
				}
				return res.json({success:true,message:"Added bids successfully"})
			})
			.catch(function(err){
				console.log(err);
  				return res.json({success:false,message:"Application Error",code:500});
  			});
	},
	getBid:function(req,res){
		return bids.getBid(req.body.id,req.body.bid_id,req.body.bid)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error adding bid",code:401});
				}
				if(result.data==null){
					return res.render("respond",{data:{amount:null,quantity:null},name:req.body.name,message:"Bid added"});
				}
				return res.render("respond",{data:result.data,name:req.body.name,message:"Bid added"});
			})
			.catch(function(err){
  				return res.json({success:false,message:"Application Error",code:500});
  			});
	},
	addToBid:function(req,res){
		if(req.body.from==undefined || req.body.to==undefined || req.body.listing==undefined || req.body.quantity==undefined || req.body.amount==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		return bids.addBid(req.body.bid_id,req.body.id,req.body.quantity,req.body.amount)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error adding bid",code:401});
				}
				return res.render("product",{message:"Bid added"});
			})
			.catch(function(err){
  				return res.json({success:false,message:"Application Error",code:500});
  			});
	},
	postBid:function(req,res){
		if(req.body.bid_id==undefined || req.body.bid==undefined || req.body.status==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		let status;
		if(req.body.status){
			status="accepted"
		} else{
			status="rejected"
		}
		return bids.respondToBid(req.body.id,req.body.bid_id,req.body.bid,status)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error responding to bid"});
				}
				if(status!=="accepted"){
					return res.json({success:true,message:"Rejected"})
				}
				let quantity;
				for(let i=0;i<result.data.amounts.length;i++){
					if(req.body.amount_id==result.data.amounts[i]._id){
						quantity=result.data.amounts[i].quantity;
					}
				}
				return listingFunctions.changeQuantity(result.data.listing,quantity);
			})
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error responding to bid",code:401});
				}
				return res.json({success:true,message:"Bid successfully accepted"});
			})
			.catch(function(err){
    				return res.json({success:false,message:"Application Error",code:500});
    			});
	}
};
