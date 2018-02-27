import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      "currentlyReading" : "Currently Reading",
      "wantToRead" : "Want to Read",
      "read" : "Read",
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(state => ({
        books: books,
        shelves: state.shelves
      }));
    });
  }

  changeBookShelf = (book, shelf) => {
    const newBooks = this.state.books.slice();
    newBooks.map((b) => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
    })
    this.setState((state) => ({
      books: newBooks,
      shelves: state.shelves
    }))
    BooksAPI.update(book, shelf);
  }

  render() {
    const { books, shelves } = this.state;
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(shelves).map(key => (
                  <Bookshelf key={key}
                             title={shelves[key]}
                             books={books.filter(book => {
                               if (book) {
                                 return book.shelf === key;
                               }
                             })}
                             shelves={shelves}
                             onChangeShelf={this.changeBookShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
