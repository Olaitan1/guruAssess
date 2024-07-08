const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Disable auto-generation of _id for subdocuments
);
const DescriptionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
} , { _id: false } // Disable auto-generation of _id for subdocuments
);

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: [DescriptionSchema], // Array of DescriptionSchema objects
    required: true
  },
  photos: [{
    type: String,
    required: true,
    default: ""
  }],
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  },
  comments: [CommentSchema]
  
},
  { timestamps: true });



    module.exports = mongoose.model("Post", PostSchema )