const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required"],
  
        // index:true,
    },
    url:{
        type:String,
        required:[true, "name is url"],
        
        lowercase:true,
    },
    desc:{
        type:String,
        required:[true, "description is required"],
    },
    metatitle:{
        type:String,
        required:[true, "title is required"],
    },
    metadesc:{
        type:String,
        required:[true, "meta description is required"],
    },
    meta_keywords:{
        type:String,
        required:[true, "meta Keywords is required"],
    },
    parentcategory:{
        type:Array,
        default:[]
    },
    parentsubcategory:{
        type:Array,
        default:[]
    },
    attribute:{
        type:Array,
        default:[]
    },
    status: {
        type: String,
        default:"Active",
      },
    banner:{
        type:String,
        default:null
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Category', categorySchema);