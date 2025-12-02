const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    homeName: {
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    location:{
      type:String,
      required:true
    },
    rating:{
      type:Number,
      required:true
    },
    image: String,
    description: String,
    rulesFile:String
  }
)

module.exports = mongoose.model("Home", homeSchema);