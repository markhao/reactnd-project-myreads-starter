import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookList from './pages/BookList'
import Search from './pages/Search'

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

  /**
   * Change shelf state for a single book and update DataBase.
   * @param  {object} book  the selected book
   * @param  {string} shelf target shelf
   * @return {Void}       Doesn't return anything
   */
  changeBookShelf = (book, shelf) => {

    //Make copy of original books
    const newBooks = this.state.books.slice();

    //Change shelf for book
    newBooks.map((b) => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
    })

    //Update UI
    this.setState((state) => ({
      books: newBooks,
      shelves: state.shelves
    }))

    //Update DB
    BooksAPI.update(book, shelf);
  }

  render() {
    const { books, shelves } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render = {() => (
            <BookList books={books} shelves={shelves}/>
        )}/>
      <Route path="/search" render = {() => (
            <Search />
        )}/>
      </div>
    )
  }
}

export default BooksApp
