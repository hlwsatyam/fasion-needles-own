const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var testoSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    subject:{
        type:String,
        default:null,
    },
    description:{
        type:String,
        default:null,
    },
    noOfStar:{
        type:Number,
        default:5,
    },
 
    logo:{
        type:String,
        default:null
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('testomonials', testoSchema);