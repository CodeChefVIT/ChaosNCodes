var {products}=require(process.cwd()+"/db/functions/create-listing.js");

module.exports={
	getProducts:function(req,res){
		products.getProducts(req.body.type,req.body.intent)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error finding products"});
				}
				return res.render("marketplace",{products:result.data,type:req.body.type,intent:req.body.intent});
			})
			.catch(function(err){
				return res.json({success:false,message:"Application Error",code:500});
			});
	},
	getProduct:function(req,res){
		products.getProduct(req.body.listing)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error finding products"});
				}
				return res.render("product",{data:result.data});
			})
			.catch(function(err){
				return res.json({success:false,message:"Application Error",code:500});
			});
	}
};
