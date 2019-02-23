var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var session=require("express-session");
var ejs=require("ejs");

var jwt=require("jsonwebtoken");

var fetchDashboard=require("./controllers/add-listing.js").getListing;
var getProducts=require("./controllers/get-products").getProducts;
var history=require("./controllers/view-transactions.js").get;

var router=require(process.cwd()+'/routes/export.js')

var app = express();

var {create}=require(process.cwd()+"/controllers/add-listing.js")


app.disable("x-powered-by");
app.set('trust proxy', 1) // trust first proxy

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine',"ejs");

app.use(express.static(process.cwd()+"/public"));



function authorise(req,res,next){
  let token=req.cookies["FF"];
  return jwt.verify(token,process.env.JWT_SECRET,function(err,result){
    if(err){
        return res.redirect("login");
    }
    if(result.id==undefined){
      return res.redirect("login");
    }
    req.body.id=result.id;
    req.body.name=result.name;
    next()
  });
}

app.get("/",function(req,res){
	if(req.cookies["FF"]){
		return res.redirect("dashboard");
	}
	return res.render("index");
});

app.get("/login",function(req,res){
	return res.render("login");
});

app.get('/dashboard',authorise,function(req,res){
  fetchDashboard(req,res);
});

app.get('/marketplace',authorise,function(req,res){
  getProducts(req,res);
});




app.get('/add',authorise,function(req,res){
  res.render("product-add")
})

app.get('/history',authorise,function(req,res){
  return history(req,res);
})

app.post('/add/createListing',authorise,function(req,res){
  return create(req,res)
})
app.get('/placebid',authorise,function(req,res){
  return res.render("placebid",{name:req.body.name})
})

app.get('/prediction',function(req,res){
  return res.render("prediction",{crops:[{image:'/images/wheat.jpg',name:"wheat",profit:"10000"},{image:'/images/wheat.jpg',name:"wheat",profit:"10000"},{image:'/images/wheat.jpg',name:"wheat",profit:"10000"}]})
})

app.use("/api",router);

app.use("*",function(req,res){
  res.send("Erorr")
})
module.exports=app;
