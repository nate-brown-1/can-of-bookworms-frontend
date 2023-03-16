import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import neuro_cover from './img/neuro_cover.jpeg';
import './BestBooks.css';
import BookModal from './BookModal';
import UpdateModal from './UpdateModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false,
      errorMessage: '',
      isModalDisplayed: false,
      isUpdateModalDisplayed: false,
      bookToUpdate: ''
    }
  }

  getBooks = async () => {
    try {
      // query string to get book info from server
      let bookRequest = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      // console.log(bookRequest);
      this.setState ({
        books: bookRequest.data
      },
      // console.log(this.state.books)
      );
    } catch (error) {
      this.setState ({
        error: true,
        errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
      })
      console.log('An error occurred: Type ' + error.response + ', ' + error.response.data)
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.title.value,
      status: event.target.status.value,
      description: event.target.description.value
    }
    this.postNewBook(newBook);
  }

  postNewBook = async ( newBook ) => {
    try {
    // query string to POST new book to server
    let createdBook = await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook);
    this.setState({
      books: [...this.state.books, createdBook.data],
      isModalDisplayed: false
    });
    // placeholder notification to confirm book added so user doesn't click multiple times
    window.alert("Book fed to bookworms!");
    } catch (error) {
    this.setState ({
      error: true,
      errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
    });
    console.log('An error occurred: Type ' + error.response + ', ' + error.response.data);
    }  
  }

  deleteBook = async (id) => {
    // query string to send delete request to server
    // format = process.env.REACT_APP_SERVER/books/id
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`)
      // create new array of books from current array in state, minus deleted book
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      // change state by replacing value of key 'books' since state cannot be mutated
      this.setState ({
        books: updatedBooks,
        isModalDisplayed: false
      });
      // placeholder notification to confirm book added so user doesn't click multiple times
      window.alert("Book taken away from bookworms!");
    } catch (error) {
      this.setState ({
        error: true,
        errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
      });
      console.log('An error occurred: Type ' + error.response + ', ' + error.response.data);
    }  
  }

  updateBook = async (bookToUpdate) => {
    console.log(bookToUpdate);
    // query string to send PUT request to server
    // PUT will replace entire current instance of book with updated new instance
    // format = process.env.REACT_APP_SERVER/books/id
    try {
      let updatedBookFromServer = await axios.put(`${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`, bookToUpdate);
      // create new array of books from current array in state, minus deleted book
      let updatedBooks = this.state.books.map(book => {
      return book._id === bookToUpdate._id ? updatedBookFromServer.data : book});
      // change state by replacing value of key 'books' since state cannot be mutated
      this.setState ({
        books: updatedBooks,
        isUpdateModalDisplayed: false
      });
      // placeholder notification to confirm book added so user doesn't click multiple times
      window.alert("Book reheated for bookworms!");
    } catch (error) {
      this.setState ({
        error: true,
        errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
    });
    console.log('An error occurred: Type ' + error.response + ', ' + error.response.data);
    }  
  }

  handleUpdateSubmit = (event) => {
    event.preventDefault();
    let bookToUpdate = {
      title: event.target.title.value || this.state.bookToUpdate.title,
      status: event.target.status.value || this.state.bookToUpdate.status,
      description: event.target.description.value || this.state.bookToUpdate.description,
      _id: this.state.bookToUpdate._id,
      __v: this.state.bookToUpdate.__v
    }
    this.updateBook(bookToUpdate);
  }

  handleFeedBookworms = () => {
    this.setState({
      isModalDisplayed: true
    })
  }

  handleStartUpdating = (book) => {
    this.setState({
      isUpdateModalDisplayed: true,
      bookToUpdate: book
    },
    // () => (console.log(this.state.bookToUpdate))
    );
  }

  handleDoneFeeding = (id) => {
    this.setState({
      isModalDisplayed: false
    })
  }

  handleDoneUpdating = () => {
    this.setState({
      isUpdateModalDisplayed: false
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    let booksArray = this.state.books.map((book, _id) => {
          return (  <Carousel.Item key={_id}>
                      <Button variant="success" onClick={() => this.handleStartUpdating(book)}>Update Book</Button>
                      <img
                        className='bookCoverClass'
                        src={neuro_cover}
                        alt={book.title}
                      />
                      <Button variant="danger" onClick={() => this.deleteBook(book._id)}>Delete Book</Button>
                      <Carousel.Caption>
                        <h4>{book.title}</h4>
                        <h5>{book.status}</h5>
                        <p>{book.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
          )
      });
  
    return (
      <>
        <h2>Our Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel variant='dark'>
            {booksArray}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}

        <Button variant="primary" onClick={this.handleFeedBookworms}>
          Feed the Bookworms!
        </Button>

        <BookModal
          show={this.state.isModalDisplayed}
          onHide={this.handleDoneFeeding}
          handleFormSubmit={this.handleFormSubmit}
        />

        <UpdateModal
          show={this.state.isUpdateModalDisplayed}
          onHide={this.handleDoneUpdating}
          handleUpdateSubmit={this.handleUpdateSubmit}
        />

      </>
    )
  }
}

export default BestBooks;
