const router = require('express').Router()
const { Book } = require('../models')
const axios = require('axios')

//axios.get(`https://www.googleapis.com/books/v1/volumes?q=${document.getElementById('search').value}`)

router.get('/googlebook/:search', (req, res) => {
 // axios.get(`http://www.googleapis.com/books/v1/volumes?q=${req.params.search}`)
  //axios.get(`https://www.googleapis.com/books/v1/volumes?q=${document.getElementById('search').value}`)


 

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&api_key=${process.env.Google_API_KEY}`)     //need to fix this line

  //axios.get(`https://www.googleapis.com/books/v1/volumes/search?q=${req.params.search}`)

             .then((data)=>{
              //  console.log(data)
               res.json(data.data)



                   //catch errors for ajax


})
    .catch(err => console.log(err))


})
router.get('/books',(req,res)=>{
  Book.find({})
    .then(books => {
      const booksFiltered = data.filter(book => {             //make a filtered version of books
        let keep = true
        books.forEach(saved => {                               //looking for the books in the database if id matches, don't keep it.
          if (saved.googleId === book.id) {                     //googleId bookId
            keep = false

          }

        })
        return keep

      })
      res.json(booksFiltered)

    })
    .catch(err => console.log(err))     //catch errors for find

})
   

module.exports = router