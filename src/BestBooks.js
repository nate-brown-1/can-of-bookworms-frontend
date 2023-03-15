import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import neuro_cover from './img/neuro_cover.jpeg';
import './BestBooks.css';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false,
      errorMessage: '',
      isModalDisplayed: false
    }
  }

  getBooks = async () => {
    try {
      // query string to get book info
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


  books = [
    { title: 'Neuromancer',
      author: 'William Gibson',
      coverURL: './neuro_cover.jpeg',
      summary: 'A hacker gets drawn into a conspiracy'
    },
    { title: 'Snow Crash',
      author: 'Neal Stephenson',
      coverURL: 'snow_URL',
      summary: 'A pizza delivery driver gets drawn into a conspiracy'
    },
    { title: 'The Stars My Destination',
      author: 'Alfred Bester',
      coverURL: 'stars_URL',
      summary: 'A pilot wakes up from cryosleep and gets drawn into a conspiracy'
    }
  ]

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
    await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook);
    } catch (error) {
    this.setState ({
      error: true,
      errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
    });
    console.log('An error occurred: Type ' + error.response + ', ' + error.response.data);
    }  
  }

  handleFeedBookworms = () => {
    this.setState({
      isModalDisplayed: true
    })
  }

  handleDoneFeeding = () => {
    this.setState({
      isModalDisplayed: false
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    let booksArray = this.state.books.map((book, idx) => {
          return (  <Carousel.Item key={idx}>
                      <img
                        className='bookCoverClass'
                        src={neuro_cover}
                        alt={book.title}
                      />
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

        {this.books.length ? (
          <Carousel variant='dark'>
            {booksArray}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}

        <Button variant="primary" onClick={this.handleFeedBookworms}>
          Feed the Bookworms!
        </Button>

        <Modal className="bookModal"
            show={this.state.isModalDisplayed}
            onHide={this.handleDoneFeeding}
            >
              <Modal.Header closeButton>
                <Modal.Title>Feed the Bookworms!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Label>Book Title
                    <Form.Control type="text" name="title" />
                  </Form.Label>
                  <Form.Label>Book Status
                    <Form.Select name="status">
                      <option value="yes">Untouched</option>
                      <option value="no">Chewed</option>
                      <option value="chewed">Swallowed</option>
                    </Form.Select>
                  </Form.Label>
                  <Form.Label>Book description
                    <Form.Control type="text" name="description" />
                  </Form.Label>
                  <Button type="submit">Feed</Button>
                </Form>
              </Modal.Body>
              <Modal.Footer className="bookModalFooter">
                The bookworms are always hungry...
              </Modal.Footer>
        </Modal>

      </>
    )
  }
}

export default BestBooks;
