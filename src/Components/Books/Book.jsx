const Book = ({ book, open }) => {
  return (
    <div className="g-col-12 g-col-sm-6 g-col-md-4 g-col-lg-3">
      <div className="book-card card" onClick={() => open()}>
        <img src={book.thumbnail} className="card-img-top" alt={book.title} />
        <div className="card-body bg-white bg-gradient bg-opacity-75 ">
          <h5 className="card-title text-truncate">{book.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted text-truncate">
            {book.author}
          </h6>
          <p className="card-text">${book.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
