var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var session=require("express-session");
var ejs=require("ejs");

var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'session'
});

var router=require(process.cwd()+'/routes/export.js')

var app = express();

store.on('error', function(error) {
  console.log("Error connecting to session database: "+error);
});

app.disable("x-powered-by");
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	key:'FellowFarmers',
  secret: 'ijeidji333nexniwmi9s2nqidij',
  resave: true,
	store:store,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine',"ejs");

app.use(express.static(process.cwd()+"/public"));



function authorise(req,res,next){
	let session=req.session;
  console.log(session)
  if(req.session.user_id!==undefined){
		next();
	} else {
		return res.render("login",{message:"Please login"});
	}
}

app.get("/",function(req,res){
	let session=req.session;
	if(req.session.user_id){
		return res.render("dashboard");
	}
	return res.render("index");
});

app.get("/login",function(req,res){
	return res.render("login");
});

// app.get('/newsfeed',function(req,res){
// 	return res.sendFile(process.cwd()+'/views/newsfeed.html');
// });
//
app.get('/dashboard',authorise,function(req,res){
	return res.render("dashboard");
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
// app.get('/marketplace',authorise,function(req,res){
// 	return res.sendFile(process.cwd()+'/views/marketplace.html');
// });
//
// app.get('/marketplace/prediction',authorise,function(req,res){
// 	return res.sendFile(process.cwd()+'/views/prediction.html');
// });
//
app.use("/api",router);

module.exports=app;
