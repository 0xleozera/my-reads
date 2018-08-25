import React from 'react';
import { Route } from 'react-router-dom';

import Library from './components/Library';
import Search from './components/Search';

import BookService from './service/BookService';

import './App.css';
import BaseService from './service/BaseService';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  async componentDidMount() {
    const totalBooks = await BookService.getAll();

    if (totalBooks.success) {
      this.setState({ books: totalBooks.data.books })
    }
  }

  updateBookShelf = async (book, updatedShelf) => {
    const { books } = this.state;

    const bookIndex = books.findIndex((key) => {
      return key.id === book.id;
    });

    const stateBooks = Object.assign([], books);

    if (bookIndex === -1) {
      const newBook = Object.assign({}, book);
      newBook.shelf = updatedShelf;
      stateBooks.push(newBook);
    } else {
      stateBooks[bookIndex] = Object.assign({}, stateBooks[bookIndex]);
      stateBooks[bookIndex].shelf = updatedShelf;
    }

    const updateBook = await BaseService.update(book, updatedShelf);

    if (updateBook.success) {
      this.setState({ books: stateBooks });
    }
  };

  render() {
    const { books } = this.state;

    if (!books) {
      return null;
    }

    return (
      <div className="app">
        <Route path="/search" render={() => (
            <Search
              libraryBooks={books}
              updateBookShelf={this.updateBookShelf}
            />
          )}
        />
        <Route exact path="/" render={() => (
            <Library
              books={books}
              updateBookShelf={this.updateBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
