var {products}=require(process.cwd()+"/db/functions/create-listing.js");
var {user}=require(process.cwd()+"/db/functions/auth-user.js");

module.exports={
	create:function(req,res){
		console.log(req.body);
		if(req.body.product_type==undefined || req.body.type==undefined || req.body.image==undefined || req.body.date==undefined || req.body.quantity==undefined || req.body.price==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		//
		// return user.checkVerify(req.body.id)
		// 	.then(function(result){
		// 		if(result.success==false){
		// 			return res.json({success:false,message:"Error finding user",code:400});
		// 		}
		// 		if(!result.data.verified){
		// 			return res.json({success:false,message:"Please verify your account"});
		// 		}
				return products.create(req.body.product_type,req.body.id,req.body.type,req.body.image,req.body.date,req.body.quantity,req.body.price)
			// })
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error adding listing",code:400});
				}
				console.log(result)
				return res.json({success:true,message:"Added listing"})
			})
			.catch(function(err){
				console.log(err);
				return res.json({success:false,message:"Application Error",code:500});
			});
	},
	getListing:function(req,res){
		return user.findUser(req.body.id)
			.then(function(result){
				console.log(result);
				if(result.success==false){
					return res.json({success:false,message:"Error finding listing",code:400});
				}
					return res.render("dashboard",{name:result.data.name,listings:result.data.listings});
			})
			.catch(function(err){
				return res.json({success:false,message:"Application Error",code:500});
			});
	}
};
