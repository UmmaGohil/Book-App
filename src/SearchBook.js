import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBook extends Component {
  state = {
    bookSearch: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})

    BooksAPI.search(query,30).then((bookSearch) => {
      if (bookSearch.error) {
        this.clearQuery()
      }
    else  if(!!bookSearch){
        if(bookSearch.length>0){
          const results = bookSearch.map((book) => {
            const existingBook = this.state.bookSearch.find((b) => b.shelf === book.shelf)
            book.shelf = !!existingBook ? existingBook.shelf : 'none'
            return book
          })
          this.setState({ results })
        }
          this.setState({ bookSearch })
      }
    })
  }

  clearQuery = () => {
    this.setState({ bookSearch:[], query: '' })
  }

  searchBooks = (query) => {
    if(query){
      this.updateQuery(query)
    }

    else{
      this.clearQuery(query)
    }
  }
/*const { books, onChangeShelf } = this.props;
const { query, bookSearch } = this.state;
const tempResults = bookSearch.map(r => {
books.forEach(b => {
  if(b.id === r.id)
  r.shelf = b.shelf;
})
return r;
})*/

  render() {
    const { onChangeShelf } = this.props
    const { query, bookSearch } = this.state
    let matchBook
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      matchBook = bookSearch.filter((book) => match.test(book.title))
    } else {
      matchBook = bookSearch
    }

    matchBook.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                name="search-books-input"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.searchBooks(event.target.value)}
              />
            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {bookSearch.map((book) => (
              <li key={book.id} className="bookshelf-list-item">
                <Book
                  onChangeShelf={onChangeShelf}
                  book={book}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
