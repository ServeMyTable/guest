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

const tableSchema = new Schema({

      RestaurantID : {
            type :String
      },
      tableNo : {
            type : Number,
            default : 0
      },
      Orders : [OrderSchema],
      TotalBill : {
            type : String
      },
      SubTotal : {
            type : String
      },
      OrderPlacedTime : {
            type : String,
            default : Time
      },
      OrderPlacedDate : {
            type : String,
            default : date
      },
      CustomerName : {
            type : String
      }
},{
      timestamps:true
});

const Table = mongoose.model('Order',tableSchema);

module.exports = Table;