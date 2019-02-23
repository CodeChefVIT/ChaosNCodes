var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var session=require("express-session");
var ejs=require("ejs");

var jwt=require("jsonwebtoken");

// var MongoDBStore = require('connect-mongodb-session')(session);
//
// var store = new MongoDBStore({
//   uri: process.env.DB_URL,
//   collection: 'session'
// });

var router=require(process.cwd()+'/routes/export.js')

var app = express();

// store.on('error', function(error) {
//   console.log("Error connecting to session database: "+error);
// });

app.disable("x-powered-by");
app.set('trust proxy', 1) // trust first proxy
// app.use(session({
// 	key:'FellowFarmers',
//   secret: 'ijeidji333nexniwmi9s2nqidij',
//   resave: true,
// 	store:store,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))


app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine',"ejs");

app.use(express.static(process.cwd()+"/public"));



function authorise(req,res,next){
  let token=req.cookies["Authorization"];
  return jwt.verify(token,process.env.JWT_SECRET,function(err,result){
    if(err){
        return res.render("login",{message:"Please login"});
    }
    if(result.id==undefined){
      return res.render("login",{message:"Please login"});
    }
    req.body.id=result.id;
    req.body.name=result.name;
    next()
  });
}

app.get("/",function(req,res){
	if(req.cookies["Authorization"]){
		return res.render("dashboard");
	}
	return res.render("index",{message:"NUunu"});
});

app.get("/login",function(req,res){
	return res.render("login");
});

// app.get('/newsfeed',function(req,res){
// 	return res.sendFile(process.cwd()+'/views/newsfeed.html');
// });
//
app.get('/dashboard',function(req,res){
  // fetchDashboard(req,res);
	return res.render("dashboard",{name:"Vatsal",listings:[{listing:{image:"/images/coffee.jpg",expired:false,date:"21-10-2018",_id:"ebxuben",product_type:"coffee", type:"buy",quantity:10}},{listing:{image:"/images/coffee.jpg",expired:false,date:"21-10-2018",_id:"ebxuben",product_type:"coffee", type:"buy",quantity:10}},{listing:{image:"/images/coffee.jpg",expired:true,date:"21-10-2018",_id:"ebxuben",product_type:"coffee", type:"buy",quantity:10}}]});
});
//
// app.get('/dashboard/newsfeed',authorise,function(req,res){
// 	return res.sendFile(process.cwd()+'/views/farmernewsfeed.html');
// });
//
// app.get('/dashboard/transactions',authorise,function(req,res){
// 	return res.sendFile(process.cwd()+'/views/farmertransactions.html');
// });
//
app.get('/marketplace',authorise,function(req,res){
	return res.sendFile(process.cwd()+'/views/marketplace.html');
});
//
// app.get('/marketplace/prediction',authorise,function(req,res){
// 	return res.sendFile(process.cwd()+'/views/prediction.html');
// });
//
app.use("/api",router);

module.exports=app;
