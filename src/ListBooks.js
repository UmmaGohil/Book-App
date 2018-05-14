import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

function ListBooks (props) {
  return (
    <div className="bookshelf">
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <li key={book.id} className="bookshelf-list-item">
              <Book
                onChangeShelf={props.onChangeShelf}
                book={ book }
              />
            </li>
          ))}
        </ol>
        <div className="open-search">
          <Link
          to="/SearchBook"
          className='add-book'
          >Add Book</Link>
        </div>
      </div>
    </div>
  )
}

export default ListBooks
