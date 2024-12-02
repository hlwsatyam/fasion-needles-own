const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
  
    },
    email: {
      type: String,
     
    },
    subject: {
      type: String,
 
    },
    message: {
      type: String,
   
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Contact", contactSchema);
