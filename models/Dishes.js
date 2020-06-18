const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DishSchema = new Schema({

      DishName : {
            type : String,
            required : true
      },
      Description : {
            type : String,
      },
      Price : {
            type : Number,
            required : true
      },
      ImageUrl :{
            type : String
      },
      tags:{
            type : Array
      },
      Category : {
            type : String,
            required : true
      }

},{
      timestamps:true
});

module.exports = DishSchema;
