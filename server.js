const express = require('express')
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/Users');
const app = express();
const Table = require('./models/Table');
const Payment = require('./models/Payment');
const shortid = require('shortid');

const fs = require('fs');
const https = require('https');

const MyRequest = require('request');

require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use (function (req, res, next) {
        if (req.secure) {
                next();
        } else {
                res.redirect('https://' + req.headers.host + req.url);
        }
});

mongoose.connect(process.env.MONGODB_URL,
      {
            useNewUrlParser : true ,
            useUnifiedTopology: true,
            useCreateIndex : true

      },function(MongoError){
            if(MongoError){
                  throw MongoError;
            }else{
                  console.log("MongoDB database connected successfully");
            }
});

const httpsOptions ={
      cert : fs.readFileSync('server.cert'),
      key  : fs.readFileSync('server.key')
}


app.get('/',function(req,res){

      res.render('home.ejs',{Message : {status:2 , msg:2}});

});

app.get('/restaurant',function(req,res){
     
      User.findOne({Phone : req.param('id')},function(err,doc){
            if(err){ res.render("Error.ejs",{error:"Some Error Occured."})}
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
            if(err){ res.render("Error.ejs",{error:"Some Error Occured."}) }
            else{
                  if(req.body.table > doc.nTables){
                        res.render('home.ejs',{Message : {status:0 , msg:"Table with number "+req.body.table+" does not exists."}});
                  }else{
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
            }
      });
})

app.post('/Cart',function(req,res){
      const ADishes = [];

      for(var i = 0 ; i < req.body.TotalItems ; i++){

            ADishes.push(req.body['Dish'+i]);

      }

      User.findOne({Phone : req.body.Id},function(err,doc){
            if(err){ res.render("Error.ejs",{error:"Some Error Occured."}) }
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

app.post('/Table', (req,response)=>{

      const Orders = [];
      const temp = req.body.Dish;
      const CustomerName = req.body.CustomerName;
      const TableNo = req.body.TableNo;
      const Bill = parseFloat(req.body.TotalBill);

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
                  tableNo : TableNo,
                  Orders : Orders,
                  TotalBill : Bill,
                  SubTotal : req.body.SubTotal,
                  CustomerName : CustomerName,
                  PaymentMode : req.body.PaymentMode
            }
            },{ upsert:true }
            ,function(error,raw){
            if(!error){
                  if(req.body.PaymentMode === "Online"){



                  }else{
                        response.json({mode:"Cash"});
                  }

            }else{
              response.render("Error.ejs",{error:"Some Error Occured."})
            }
      });

      const RazAccountId = req.body.RazAccountID;
      if(RazAccountId){
            const data = {
                  "amount" : parseInt(Bill*100),
                  "currency" : "INR",
                  "receipt" : shortid.generate(),
                  "transfers" : [
                      {
                        "account" : RazAccountId,
                        "amount" : parseInt(Bill*98),
                        "currency" : "INR",
                        "notes" : {
                            "Table" : TableNo,
                            "CustomerName" : CustomerName,
                            "Orders" : JSON.stringify(Orders)
                        },
                        "linked_account_notes": ["Table" , "CustomerName" , "Orders"],
                        "on_hold": 0
                      }
                  ]
            };

                  const options = {
                        'method': 'POST',
                        'url': 'https://api.razorpay.com/v1/orders',
                        'headers': {
                          'Authorization': 'Basic '+new Buffer.from(process.env.KEY+':'+process.env.KEYSECRET).toString('base64'),
                          'Content-Type': 'application/json'
                        },
                        'body': JSON.stringify(data)
                  }
                  MyRequest(options,function(err,res){
                    if(err){throw new Error(err); }else{
                    const OrderRazorPayResponse = JSON.parse(res.body);

                    response.json({
                          key : process.env.KEY,
                          name : "Serve My Table",
                          id : OrderRazorPayResponse.id ,
                          currency : OrderRazorPayResponse.currency,
                          amount : parseInt(OrderRazorPayResponse.amount),
                          fpage : '/FinalPage',
                          Order : Orders,
                    });
                }
            });
      }
});

app.post('/FinalPage',function(req,res){

      Table.updateMany({RestaurantID:req.body.id,tableNo : req.body.TableNo},
            { $set :{ PaymentStatus : true } },{ upsert:true }
            ,(err)=>{
                  if(err){
                        response.render("Error.ejs",
                        {error:"Error while updating Payment Status."});
                  }else{
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
                        var PaymentMode = "Cash";
                        if(req.body.paymentId){ PaymentMode = "Online"; }


                          /*generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);

                          if (generated_signature == razorpay_signature) {
                            payment is successful add to payment
                          }*/

                        Payment.updateMany({RestaurantID:req.body.id,TableNo:req.body.TableNo},
                          {$set : {
                            RestaurantID : req.body.id,
                            Amount : req.body.TotalBill,
                            TableNo : req.body.TableNo,
                            Order : Orders,
                            PaymentID : req.body.paymentId,
                            myOrderID : req.body.OrderIDmy,
                            PaymentMode : PaymentMode,
                            PaymentStatus : true,
                            OrderIDRaz : req.body.OrderIDRaz,
                            SignatureRaz : req.body.SignatureRaz,
                          }},{upsert : true},function(err,raw){
                          });
                        res.render('FinalPage.ejs',{
                              RestaurantID : req.body.id,
                              tableNo : req.body.TableNo,
                              Orders : Orders,
                              TotalBill : req.body.TotalBill,
                              SubTotal : req.body.SubTotal,
                              CustomerName : req.body.CustomerName,
                              RestaurantName : req.body.RestaurantName,
                              RestaurantAddress : req.body.RestaurantAddress,
                              RestaurantGST : req.body.RestaurantGST,
                              PaymentID : req.body.paymentId
                        });
                  }
            });


});

app.get("*",function(req,res){
    res.render('404.ejs');
});

//=================================== LISTEN ON PORT ==================================

https.createServer(httpsOptions, app)
.listen(process.env.PORT || 8080,function(){
      console.log('Server is up and Running on https://localhost:8080');
});
