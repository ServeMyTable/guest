const mongoose = require('mongoose');
const Dishes = require('./Dishes');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    
      username : {
            type : String,
            required : true
      },
      password : {
            type : String,
            required : true
      },
      email :{
            type : String,
            required : true,
            unique : true
      },
      RestaurantName : {
            type : String,
            default : ""
      },
      Dishes : [Dishes],
      Categories : {
            type : Array
      }
      ,
      Location:{
            type : String,
            default : ""
      },
      nTables:{
            type : Number,
            min:1,
            default:1
      },
      gstin:{
            type : String,
            default : ""
      },
      pan : {
            type : String,
            default : ""
      },
      panFileName : {
            type : String
      },
      GstFileName : {
            type : String
      },
      Phone:{
            type : Number,
            default : ""
      },
      AccountName : {
            type : String,
            
      },
      AccountNumber : { 
            type : Number,
            
      },
      IFSCcode : {
            type : String,
            
      },
      upiID : {
            type : String
      },
      
      Subscribed : {
            type : Boolean,
            default : false
      },
      EndsOn : {
            type : String
      },
      ImageUrl:{
            type : String
      },
      FileName:{
            type : String
      },
      Accountverified:{
            type : Boolean,
            default : false
      },
      Documentverified:{
            type : Boolean,
            default : false
      }       
      
},{
      timestamps:true
});

const Users = mongoose.model('User',userSchema);

module.exports = Users;