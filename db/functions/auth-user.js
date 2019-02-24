var User=require(process.cwd()+"/db/models/user.js");

const { spawn } = require('child_process');

var match=require(process.cwd()+'/face_rec.js')

module.exports.user={
	create:function(name,phone,location,lang,otp){
		return new Promise(function(resolve,reject){
			let user=new User({
				name:name,
				phone:phone,
				location:location,
				lang:lang,
				otp:otp,
				face_rec:null,
				listings:[],
				bid:[],
				reports:[],
				newsfeed_keywords:[]
			});
			return user.save()
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"User exists"});
					}
					return resolve({success:true,message:"User created",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	generateOTP:function(phone){
		return new Promise(function(resolve,reject){
			let otp= Math.floor(1000 + Math.random() * 9000);
			return User.findOneAndUpdate({phone:phone},{otp:otp})
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"User not found"});
					}
					return resolve({success:true,message:"OTP created",data:result,otp:otp,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	login:function(phone,password){
		return new Promise(function(resolve,reject){
			return User.findOneAndUpdate({phone:phone,otp:password}).populate([{path:"listings.listing",select:"expired name _id product_type type image date quantity"}])
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"Incorrect combination"});
					}
					return resolve({success:true,message:"Logged in",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	verify:function(phone){
		return new Promise(function(resolve,reject){
			return User.findOneAndUpdate({phone:phone},{verified:true})
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"User exists"});
					}
					return resolve({success:true,message:"Verified user",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	checkVerify:function(id){
		return new Promise(function(resolve,reject){
			return User.findOne({_id:id})
				.then(function(result){
					if(result==null){
						return reject({success:false,code:401,message:"Error finding data"});
					}
					return resolve({success:true,message:"Found",data:result.verified,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	findUser:function(user){
		return new Promise(function(resolve,reject){
			return User.findOne({_id:user}).populate([{path:"listings.listing",select:"expired name _id product_type type image current_quantity date quantity"}])
				.then(function(result){
					if(result==null){
						return reject({success:false,code:404,message:"User not found"});
					}
					return resolve({success:true,message:"User found",data:result,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	},
	face_login:function(phone,path){
		return new Promise(function(resolve,reject){
			let user;
			return User.findOne({phone:phone})
				.then(function(result){
					if(result==null){
						return reject({success:false,code:404,message:"User not found"});
					}
					user=result;
					return match(result.face_rec,path)
				})
				.then(function(result){
					if(result==null){
						return reject({success:false,code:404,message:"User not found"});
					}
					return resolve({success:true,message:"User found",data:user,code:200});
				})
				.catch(function(err){
					console.log(err);
					return reject({success:false,message:"Application Error",code:500});
				});
		});
	}
};
