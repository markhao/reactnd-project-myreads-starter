import React from "react";
import PropTypes from "prop-types";
import Bookshelf from "../components/Bookshelf";
import { Link } from "react-router-dom";

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, shelves, onChangeShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(shelves).map(key => (
              <Bookshelf
                key={key}
                title={shelves[key]}
                books={books.filter(book => {
                  if (book) {
                    return book.shelf === key;
                  }
                })}
                shelves={shelves}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </div>
        </div>
        <Link to="/search" className="open-search">
          Search
        </Link>
      </div>
    );
  }
}

export default BookList;
