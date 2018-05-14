import React, { Component } from 'react'
import ListBooks from './ListBooks'

class Bookshelf extends Component {
  render() {
    const { books, onChangeShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          </div>

        <div className="list-books-content">
          <div>
          <h2 className="bookshelf-title">Currently Reading</h2>
            <ListBooks
              onChangeShelf={onChangeShelf}
              books={books.filter(book =>
                book.shelf === "currentlyReading")}
            />

            <h2 className="bookshelf-title">Want to Read</h2>
            <ListBooks
              onChangeShelf={onChangeShelf}
              books={books.filter(book =>
                book.shelf === "wantToRead")}
            />

            <h2 className="bookshelf-title">Read</h2>
            <ListBooks
              onChangeShelf={onChangeShelf}
              books={books.filter(book =>
                book.shelf === "read")}
            />
          </div>
        </div>
        </div>
    )
  }
}

export default Bookshelf
