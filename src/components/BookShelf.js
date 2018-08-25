import React from 'react';
import Book from './Book';

const Bookshelf = ({ name, books, updateBookShelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{name}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          books
            .sort((a, b) => a.title > b.title)
            .map((book) => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  authors={book.authors}
                  title={book.title}
                  imageLinks={book.imageLinks}
                  shelf={book.shelf}
                  updateBookShelf={updateBookShelf}
                />
              </li>
            ))
        }
      </ol>
    </div>
  </div>
);

export default Bookshelf;
