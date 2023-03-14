import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import neuro_cover from './img/neuro_cover.jpeg';
import './BestBooks.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false,
      errorMessage: ''
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
      console.log(this.state.books)
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
      </>
    )
  }
}

export default BestBooks;
