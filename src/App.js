import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    books : []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

changeShelf = (book, shelf) => {
  BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })

  }

  render() {
    return (
      <div className='app'>
        <Route exact path="/" render={() => (
            <Bookshelf
              books = {this.state.books}
              onChangeShelf = {this.changeShelf}
            />
          )}/>

        <Route path="/SearchBook" render={({  history }) => (
          <SearchBook
            showingBooks = {(book) => {
              history.push('/')
            }}
            onChangeShelf = {this.changeShelf}
            book= { this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default App
