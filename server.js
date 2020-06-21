const express = require('express')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/Users');
const app = express();
const Table = require('./models/Table');

const fs = require('fs');
const https = require('https');

require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL,
      {
            useNewUrlParser : true , 
            useUnifiedTopology: true,
            useCreateIndex : true 

      },function(MongoError){
            if(MongoError){
                  console.log("Database Error Occured : "+MongoError);
            }else{
                  console.log("MongoDB database connected successfully");
            }
});

const httpsOptions ={
      cert : fs.readFileSync('server.cert'),
      key  : fs.readFileSync('server.key')
}


app.get('/',function(req,res){

      res.render('home.ejs');

});

app.get('/restaurant',function(req,res){

      User.findOne({Phone : req.param('id')},function(err,doc){
            if(err){ console.log(err)}
            else{

                  res.render("Restaurant.ejs",{
                        Restaurant : {
                              name : doc.RestaurantName,
                              location : doc.Location,
                              dishes : doc.Dishes,
                              full : doc
                        },
                        Table:req.param('table'),
                        CustomerName : req.param('name') 
                  });
            }
      });
      
});

app.post('/restaurant',function(req,res){

      User.findOne({Phone : req.body.id},function(err,doc){
            if(err){ console.log(err)}
            else{

                  res.render("Restaurant.ejs",{
                        Restaurant : {
                              name : doc.RestaurantName,
                              location : doc.Location,
                              dishes : doc.Dishes,
                              full : doc
                        },
                        Table:req.body.table,
                        CustomerName : req.body.CustomerName 
                  });
            }
      });
})

app.post('/Cart',function(req,res){
      const ADishes = [];
      
      for(var i = 0 ; i < req.body.TotalItems ; i++){
            
            ADishes.push(req.body['Dish'+i]);
            
      }
      
      User.findOne({Phone : req.body.Id},function(err,doc){
            if(err){ console.log(err)}
            else{
                  const Today = new Date(Date.now()).toLocaleString().split(',');
                  res.render("Cart.ejs",{
                        Dish : ADishes,
                        TableNo : req.body.TableNo,
                        id : req.body.Id,
                        Total : req.body.TotalItems,
                        full : doc,
                        Time : Today[1],
                        CustomerName : req.body.CustomerName
                  });
            }
      });
      
});

app.post('/Table',function(req,response){

      const Orders = [];
      const temp = req.body.Dish;
      const result = temp.split(',');
      for(var i = 0 ; i < result.length ; i=i+3){
            Orders.push({
                  DishName : result[i],
                  Quantity : result[i+1],
                  Rate : result[i+2]
            });
      }

      Table.updateMany({RestaurantID:req.body.id,tableNo : req.body.TableNo},
            {
            $set :{
                  RestaurantID : req.body.id,
                  tableNo : req.body.TableNo,
                  Orders : Orders,
                  TotalBill : req.body.TotalBill,
                  SubTotal : req.body.SubTotal,
                  CustomerName : req.body.CustomerName
            }
            },{ upsert:true }
            ,function(error,raw){
            if(!error){
                  
                  response.send('/FinalPage');
            }
      });
});

app.get('/FinalPage',function(req,res){
      res.render('FinalPage.ejs');
});

app.post('/Pay',function(req,res){
      console.log(req.body);
});

//=================================== LISTEN ON PORT ==================================

https.createServer(httpsOptions, app)
.listen(process.env.PORT || 8080,function(){ 
      console.log('Server is up and Running on http://localhost:8080'); 
});