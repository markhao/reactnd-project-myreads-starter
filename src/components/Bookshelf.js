import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class Bookshelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    shelves: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }


  render () {
    const { title, books, shelves, onChangeShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}><Book
                  book={book}
                  shelves={shelves}
                  onChangeShelf={onChangeShelf}
              /></li>
            ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;
