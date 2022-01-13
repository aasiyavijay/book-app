import React from "react";

function BookDetail({ book, close }) {
  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => close()}
            ></button>
          </div>
          <div className="modal-body">
            <div className="book-card card d-flex">
              <img
                src={`${book.thumbnail}?random=${book.id}`}
                className="card-img-top"
                alt={book.title}
              />
              <div className="card-body bg-white bg-gradient bg-opacity-75 ">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{book.iban}</h6>
                <p className="card-text">${book.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
