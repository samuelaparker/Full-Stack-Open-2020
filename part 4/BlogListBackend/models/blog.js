const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    body: String
  })


  module.exports = mongoose.model('Blog', blogSchema)