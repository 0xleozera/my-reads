import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';
import BookService from '../service/BookService';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      books: []
    };
  }

  updateQuery = async (query) => {
    const { libraryBooks } = this.props;

    this.setState({ query });

    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      return;
    }

    const booksFound = await BookService.search(trimmedQuery, 10);

    if (booksFound.success) {
      const { books } = booksFound.data;

      if (books && books.length) {
        const totalBooks = books.map((book) => {
          const libBook = libraryBooks.find((libBook) => libBook.id === book.id);
          const shelf = libBook ? libBook.shelf : 'none';

          return {
            id: book.id,
            shelf: shelf,
            authors: book.authors,
            title: book.title,
            imageLinks: {
              thumbnail: book.imageLinks.thumbnail
            }
          };
        });

        this.setState({ books: totalBooks });
      }
    }
  };

  render() {
      const { books } = this.state;
      const { updateBookShelf } = this.props;

      return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                books.map((book) => (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      shelf={book.shelf}
                      authors={book.authors}
                      title={book.title}
                      imageLinks={book.imageLinks}
                      updateBookShelf={updateBookShelf}
                    />
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      );
  }
}

export default Search;
