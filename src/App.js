import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookList from "./pages/BookList";
import Search from "./pages/Search";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    }
  };

  componentDidMount() {
    //Get Books Data
    BooksAPI.getAll().then(books => {
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
    let newBooks = [];
    const { books } = this.state;
    if (books.filter(b => b.id === book.id).length === 0) {
      book.shelf = shelf;
      newBooks = books.concat([book]);
    } else {
      //Change shelf for book
      newBooks = books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      });
    }

    //Update UI
    this.setState(state => ({
      books: newBooks,
      shelves: state.shelves
    }));

    //Update DB
    BooksAPI.update(book, shelf);
  };

  render() {
    const { books, shelves } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={books}
              shelves={shelves}
              onChangeShelf={this.changeBookShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={books}
              shelves={shelves}
              onChangeShelf={this.changeBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
