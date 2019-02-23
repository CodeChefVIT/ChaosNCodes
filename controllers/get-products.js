var {products}=require(process.cwd()+"/db/functions/create-listing.js");

module.exports={
	getProducts:function(req,res){
		products.getProducts()
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Error finding products"});
				}
				console.log(result.data)
				return res.render("marketplace",{name:req.body.name,listings:result.data});
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
				return res.render("product",{name:req.body.name,data:result.data});
			})
			.catch(function(err){
				return res.json({success:false,message:"Application Error",code:500});
			});
	}
};
