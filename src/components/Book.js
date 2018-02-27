import React from 'react'
import PropTypes from 'prop-types'
import Selector from './Selector'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  changeToShelf = (shelf) => {
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(this.props.book, shelf);
    }
  }

  render () {
    const { book, shelves } = this.props;

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer"><Selector onChangeShelf={this.changeToShelf} shelves={shelves} defaultValue={book.shelf}/></div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(' & ')}</div>
      </div>
    )
  }
}

export default Book;
