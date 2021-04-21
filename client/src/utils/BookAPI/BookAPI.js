import axios from 'axios'

const Book = {
  
  getGooglebook: search => axios.get(`/api/googlebook/${search}`), //route that bring googlebook data // this function
  getBooks: () => axios.get('/api/books'),                         //get books from database
  addBook: book => axios.post('/api/books', book),                   //add book route that add books to the database
  deleteBook: id => axios.delete(`/api/books/${id}`)               //delete book route to delete books


}

export default Book