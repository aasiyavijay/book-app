import { useState, useEffect } from "react";

import Book from "./Book";

import booksJson from "./../../Data/books.json";

import "./style.scss";
import Filters from "./Filters";
import BookDetail from "./BookDetail";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [showBookDetailPoup, setShowBookDetailPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const Loading = () => (
    <div className="loader d-flex justify-content-center align-items-center bg-white bg-opacity-50">
      <div
        className="spinner-border text-primary"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setIsFetching(true);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ result: booksJson }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setBooks(json.result);
        setFilteredBooks(json.result);
        setIsFetching(false);
      })
      .catch((error) => {
        setIsFetching(false);
        console.error(error);
      });
  };

  const filterBooks = (filter) => {
    let filteredBooks = books
      .filter((book) =>
        filter.author !== ""
          ? book.author.toLowerCase() === filter.author.toLowerCase()
          : book
      )
      .filter((book) =>
        filter.title !== ""
          ? book.title.toLowerCase().includes(filter.title.toLowerCase())
          : book
      )
      .filter((book) =>
        filter.minPrice !== ""
          ? parseInt(book.price) > parseInt(filter.minPrice)
          : book
      )
      .filter((book) =>
        filter.maxPrice !== ""
          ? parseInt(book.price) < parseInt(filter.maxPrice)
          : book
      );

    setFilteredBooks(filteredBooks);
  };

  const openBookDetail = (book) => {
    setSelectedBook(book);
    setShowBookDetailPopup(true);
  };

  return (
    <div className="books-list-wrapper py-4">
      <Filters books={books} onfilterBooks={(e) => filterBooks(e)} />
      <div className="books-main">
        {isFetching ? (
          <Loading />
        ) : filteredBooks.length ? (
          <div className="books-list grid">
            {filteredBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                open={() => openBookDetail(book)}
              />
            ))}
          </div>
        ) : (
          "No results"
        )}
        {showBookDetailPoup ? (
          <>
            <BookDetail
              book={selectedBook}
              close={() => setShowBookDetailPopup(false)}
            />
            <div className="modal-backdrop fade show"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Books;
