const { model, Schema } = require('mongoose')

const Book = new Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  link: String,
  googleId: String
})

module.exports = model('Book', Book)