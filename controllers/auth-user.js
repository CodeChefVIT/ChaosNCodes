var {user}=require(process.cwd()+"/db/functions/auth-user.js");

var accountSid = "AC637e88ce82333765385485ab2341fc11";
var authToken = "ddade7923da6b12f7fada725510e6741";

var client = require("twilio")(accountSid, authToken);

module.exports={
	signup:function(req,res){
		if(req.body.name==undefined || req.body.phone==undefined || req.body.location==undefined || req.body.lang==undefined || req.body.otp==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		return user.create(req.body.name,req.body.phone,req.body.location,req.body.lang,req.body.otp)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"User exists. Try logging in."});
				}
				return res.render("dashboard",{name:result.name,listings:result.listings});
			})
			.catch(function(err){
				return res.json({success:false,message:"Application Error",code:500});
			});
	},
	generateOTP:function(req,res){
		if(req.body.phone==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		user.generateOTP(req.body.phone).then(function(result){
			if(result.success==false){
				return res.json({success:false,message:"User not found. Please sign up before trying to login.",code:404});
			}
			return client.messages.create({
				body: result.otp,
				from: "12013350926",
				to: req.body.phone
			});
		})
			.then(function(message){
				console.log(message);
				return res.json({success:true,message:"Check your phone messages",code:200});
			})
			.catch(function(err){
				console.log(err);
				return res.json({success:false,message:"Application Error",code:500});
			});
	},
	login:function(req,res){
		if(req.body.phone==undefined || req.body.otp==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		return user.login(req.body.phone,req.body.otp)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Incorrect OTP entered"});
				}
				req.session.user_id=result.data._id
				return res.json({success:true,message:"Logged in"})
			})
			.catch(function(err){
				console.log(err);
				return res.json({success:false,message:"Application Error",code:500});
			});
	}
};
