var mongoose=require("mongoose");

var listing=new mongoose.Schema({
	expired:{
		type:Boolean,
		default:false
	},
	product_type:{
		type:String,
		default:"onion" //or potato/etc
	},
	by:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	type:{
		type:String,
		default:"sale" //or buy
	},
	image:{
		type:String
	},
	date:{
		type:String
	},
	quantity:{
		type:Number
	},
	current_quantity:{
		type:Number
	},
	price:{
		type:Number
	},
	bids:[
		{
			bid:{
				type:mongoose.Schema.Types.ObjectId,
				ref:"bids"
			}
		}
	],
	reports:[
		{
			user:{
				type:mongoose.Schema.Types.ObjectId,
				ref:"user"
			},
			type:{
				type:String,
				default:"product-quality" //product-quality,delayed-delivery,fraudulent-behavior
			},
			message:{
				type:String
			}
		}
	]
});

var bids=new mongoose.Schema({
	by:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	listing:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"listing"
	},
	to:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	amounts:[
		{
			quantity:{
				type:Number
			},
			amount:{
				type:Number
			},
			status:{
				type:String,//accepted,rejected,counter,none
			}
		}
	]
});

module.exports.listing=mongoose.model("listings",listing);
module.exports.bids=mongoose.model("bids",bids);
