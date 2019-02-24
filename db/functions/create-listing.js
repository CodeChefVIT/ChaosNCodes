var User=require(process.cwd()+"/db/models/user.js");
var {listing}=require(process.cwd()+"/db/models/listings.js");


module.exports.products={
	create:function(product_type,by,type,image,date,quantity,price){
		return new Promise(function(resolve,reject){
			let Listing=new listing({
				expired:false,
				product_type:product_type,
				by:by,
				type:type,
				image:image,
				date:date,
				quantity:quantity,
				current_quantity:quantity,
				price:price,
				bids:[],
				reports:[]
			});
			return Listing.save()
				.then(function(result){
					if(result==null){
						return resolve({success:false,message:"Error creating listing"});
					}
					return User.findOneAndUpdate({_id:by},{$push:{listings:{listing:result._id}}},{new:true});
				})
				.then(function(result){
					console.log(result);
					if(result==null){
						return resolve({success:false,message:"Error adding listing"});
					}
					return resolve({success:true,message:"Listing added",data:result});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	expireListing:function(id,by){
		return new Promise(function(resolve,reject){
			return Listing.findOneAndUpdate({_id:id,by:by},{expired:true})
				.then(function(result){
					if(result==null){
						return resolve({success:false,message:"Error expiring listing"});
					}
					return resolve({success:true,message:"Listing expired",data:result});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	getListing:function(id,by){
		return new Promise(function(resolve,reject){
			return listing.fineOne({_id:id,by:by}).populate([{path:"bids",populate:[{path:"bids.to",select:"name phone"},{path:"bids.by",select:"name phone"}]},{path:"reports.user",select:"name"}])
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"Error getting listing"});
					}
					return resolve({success:true,message:"Found listing",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	getProducts:function(){
		return new Promise(function(resolve,reject){
			return listing.find({},"name image product_type quantity type date price current_quantity by")
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"Error getting listings"});
					}
					return resolve({success:true,message:"Found listings",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	getProduct:function(listing){
		return new Promise(function(resolve,reject){
			return listing.findOne({_id:listing},"name image type date price quantity current_quantity by")
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"Error getting listings"});
					}
					return resolve({success:true,message:"Found listings",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
};
