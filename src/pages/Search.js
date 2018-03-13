import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  state = {
    data: {
      searchTerm: "",
      searchResult: [],
      error: ""
    },
    typingTimeOut: 0
  };

  onChange = e => {
    //Clear Time Out When Typing
    clearTimeout(this.state.typingTimeOut);
    this.setState({
      data: {
        searchTerm: e.target.value,
        searchResult: [],
        error: ""
      },
      //Call SearchAPI 1.5s after user stop typing
      typingTimeOut: setTimeout(() => {
        if (this.state.data.searchTerm) {
          BooksAPI.search(this.state.data.searchTerm).then(data => {
            this.updateSearchResult(data);
          });
        }
      }, 1500)
    });
  };

  changeShelf = (book, shelf) => {
    this.props.onChangeShelf(book, shelf);

    //Change shelf for book
    const results = this.state.data.searchResult.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      return b;
    });

    this.setState({
      data: { ...this.state.data, searchResult: results }
    });
  };

  updateSearchResult = data => {
    if (data.error) {
      this.setState({
        data: { ...this.state.data, error: data.error }
      });
    } else {
      const newData = data.map(result => {
        const match = this.props.books.filter(b => b.id === result.id)[0];
        return match ? match : result;
      });
      this.setState({
        data: { ...this.state.data, searchResult: newData }
      });
    }
  };

  render() {
    const { data } = this.state;
    const { shelves } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onChange}
              value={data.searchTerm}
            />
          </div>
        </div>
        <div className="search-books-results">
          {data.error ? (
            <h1>{data.error}</h1>
          ) : (
            <ol className="books-grid">
              {data.searchResult.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelves={shelves}
                    onChangeShelf={this.changeShelf}
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
