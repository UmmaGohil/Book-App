import React from 'react'

function Book (props) {
  const bookCover = !!props.book && props.book.imageLinks ? props.book.imageLinks.thumbnail : ''
  return(
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${bookCover})`
        }}></div>

        <div className="book-shelf-changer">
          <select className="book-change" onChange={(event) =>
            props.onChangeShelf(props.book, event.target.value)}>
            <option value="none" disabled>Move to...</option>
            <option selected={props.book.shelf === "currentlyReading"} value="currentlyReading">Currently Reading</option>
            <option selected={props.book.shelf === "wantToRead"} value="wantToRead">Want to Read</option>
            <option selected={props.book.shelf === "read"} value="read">Read</option>
            <option selected={props.book.shelf === "none"} value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors ? props.book.authors.join('') : 'none'}</div>
    </div>
  )
}

export default Book
