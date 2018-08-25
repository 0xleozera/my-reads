import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

class Library extends Component {
  filterBooks = (shelf) => {
    const { books } = this.props;

    return books.filter((book) => book.shelf === shelf);
  }

  render() {
      const { updateBookShelf } = this.props;

      return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                name="Currently Reading"
                books={this.filterBooks('currentlyReading')}
                updateBookShelf={updateBookShelf}
              />
              <BookShelf
                name="Want to Read"
                books={this.filterBooks('wantToRead')}
                updateBookShelf={updateBookShelf}
              />
              <BookShelf
                name="Read"
                books={this.filterBooks('read')}
                updateBookShelf={updateBookShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
    );
  }
}

export default Library;
