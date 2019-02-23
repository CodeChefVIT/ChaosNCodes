var {user}=require(process.cwd()+"/db/functions/auth-user.js");

var jwt=require("jsonwebtoken");

var accountSid = "AC637e88ce82333765385485ab2341fc11";
var authToken = "ddade7923da6b12f7fada725510e6741";

var client = require("twilio")(accountSid, authToken);
const puretext = require('puretext');


module.exports={
	signup:function(req,res){
		if(req.body.name==undefined || req.body.phone==undefined){
			return res.json({success:false,message:"Enter all the details",code:500});
		}
		let result;
		return user.create(req.body.name,req.body.phone,req.body.location,req.body.lang,req.body.otp)
			.then(function(resp){
				if(resp.success==false){
					return res.json({success:false,message:"User exists. Try logging in."});
				}
				result=resp.data;
				return jwt.sign({id:result._id},process.env.JWT_SECRET,function(err,token){
					if(err){
						return res.json({success:false,message:"Application Error",code:500});
					}
					res.cookie('FF',token, { maxAge: 900000, httpOnly: true })
					console.log(result);
					return res.json({success:true,message:"Successfully signed up"})
				})
			})
			.catch(function(err){
				console.log(err);
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
			let text = {
					 // To Number is the number you will be sending the text to.
					 toNumber: '+X-XXX-XXX-XXXX',
					 // From number is the number you will buy from your admin dashboard
					 fromNumber: '+14157992515',
					 // Text Content
					 smsBody: result.otp,
					 //Sign up for an account to get an API Token
					 apiToken: 'testaccount'
			 };
			 puretext.send(text, function (err, response) {
		    if(err){
					return res.json({success:false,message:"Error sending message"})
				}
				return res.json({success:false,message:"OTP sent to phone"})
		  })

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
		if(req.body.login_type==0){
			return user.face_login(req.body.phone,req.body.face_rec);
		}
		return user.login(req.body.phone,req.body.otp)
			.then(function(result){
				if(result.success==false){
					return res.json({success:false,message:"Incorrect OTP entered"});
				}
				return jwt.sign({id:result._id}.process.env.JWT_SECRET,function(err,token){
					if(err){
						return res.json({success:false,message:"Application Error",code:500});
					}
					res.cookie('FF',token, { maxAge: 900000, httpOnly: true })
					return res.json({success:true,message:"Logged in"})
				})
			})
			.catch(function(err){
				console.log(err);
				return res.json({success:false,message:"Application Error",code:500});
			});
	}
};
