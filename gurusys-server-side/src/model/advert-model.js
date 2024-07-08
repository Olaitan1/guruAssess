const mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: String,
    required:false
  },
  position:{
    type: String,
    required: true,
    enum:["Home1", "Home2", "Article1", "Article2"]
  }

});

module.exports = mongoose.model('Advert', AdvertSchema);
