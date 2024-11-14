const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usertable',
      default: null,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    star: {
      type: Number,
      default: 0,
    },
    commentSubject: {
      type: String,
      default: null,
    },
    commentDescription: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;
