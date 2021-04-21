import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'

import Book from '../../utils/BookAPI';
import Form from '../../components/Form'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350
  },
  media: {
    height: 150
  }
}))



const Home = () =>{
  const classes = useStyles()

  const [bookState, setBookState] = useState({
    search: '',
    books: []
  })

  const handleInputChange = ({ target }) => {
    setBookState({ ...bookState, [target.name]: target.value })
  }

  const handleSearchBook = event => {
    event.preventDefault()
    Book.getGooglebook(bookState.search)          //BookAPI.js  getGooglebook
      .then(({ data: books }) => {
        console.log(books)
        setBookState({ ...bookState,books: books.items })
      })
      .catch(err => console.error(err))
  }

  const handleSaveBook = book => { 
    console.log(book)              //verify this function
    Book.addBook(book)
      .then(() => {
        console.log('addBook')
        const books = bookState.books.filter(googlebook => googlebook.id !== book.googleId) //please check this bookId             //(giphy => giphy.id !== gif.gifId)
        setBookState({ ...bookState, books })
      })
  }



return (
  <>
<h1>This is the home page</h1>
<Form 
      search={bookState.search}
      handleInputChange={handleInputChange}
      handleSearchBook={handleSearchBook}
/>

{
bookState.books.length     //if we have length of books then map over else null
? bookState.books.map(book => (

  <Card key={book.id} className={classes.root}>
    <CardHeader 
      title={book.volumeInfo.title}
      subheader={book.volumeInfo.authors?.length ? `Created by ${book.volumeInfo.authors}` : 'Creator unknown'}
    
    /> 

    <CardMedia 
      className={classes.media}
      // image={book.images.original.url}        //
      // title={book.title}
    />
    {/* <img class="cover" src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}" alt="${book.volumeInfo.title}"/>
      <h2>${book.volumeInfo.title}</h2>
      <div
        data-title="${book.volumeInfo.title}"
        data-cover="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}"
        data-authors="${book.volumeInfo.authors}"
        data-categories="${book.volumeInfo.categories}"
        data-description="${book.volumeInfo.description}"
        data-pagecount="${book.volumeInfo.pageCount}"
        data-published="${book.volumeInfo.publishedDate}">
        <button class="addBook">Add to reading list</button>
        </div> */}
    <CardActions>
     <Button
        size='small'
        color='primary'
        onClick={() => handleSaveBook({
          title: book.volumeInfo.title,
          source: book.volumeInfo.imageLinks.smallThumbnail,
          url: book.volumeInfo.infoLink,
          author: book.volumeInfo.authors,
          googleId: book.volumeInfo.id  || 1              //this came from model book.js
        })}
     
     
     >Save</Button>
     <Button
        size='small'
        color='primary'
        href={book.volumeInfo.infoLink}
     
     >View</Button>

   </CardActions>
  </Card>
))
: null 

}






</>

)

}

export default Home