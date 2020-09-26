const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Today = new Date(Date.now()).toLocaleString().split(',');

const date = Today[0].toString();
const Time = Today[1].toString();

const OrderSchema = new Schema({

      DishName : {
            type : String,
            default : ""
      },
      Quantity : {
            type : Number,
            default : 0
      },
      Rate  : {
            type : Number,
            default : 0
      }
});

const paymentSchema = new Schema({

  RestaurantID : String,
  Amount : String,
  TableNo : Number,
  Order : [OrderSchema],
  PaymentID : String,
  myOrderID : String,
  PaymentMode : String,
  PaymentStatus : Boolean,
  OrderIDRaz : String,
  SignatureRaz : String,

});

const Payment = mongoose.model('Payment',paymentSchema);

module.exports = Payment;
