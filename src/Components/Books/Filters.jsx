import { useState, useEffect } from "react";

function Filters({ books, onfilterBooks }) {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setAuthors([...new Set(books.map((book) => book.author))]);
  }, [books]);

  useEffect(() => {
    let filter = {
      author: selectedAuthor,
      title: searchTitle,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    onfilterBooks(filter);
  }, [selectedAuthor, searchTitle, minPrice, maxPrice]);

  const SelectComponent = ({ items, title, selectClassName, handleChange }) => (
    <div className={`col-sm-6 col-md-3 mb-3 filter ${selectClassName}`}>
      <select
        className="form-select"
        onChange={(e) => handleChange(e.target.value)}
        value={selectedAuthor}
      >
        <option value="" defaultValue disabled>
          Select {title}
        </option>
        {items.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );

  const clearFilters = () => {
    console.log("clear filters");
    setSelectedAuthor("");
    setSearchTitle("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="filters book-filters mb-4 row">
      <div className="col-sm-6 col-md-3 mb-3 filter filter-title ">
        <input
          className="form-control"
          name="searchTitle"
          value={searchTitle || ""}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="search title"
          autoComplete="off"
        />
      </div>
      <SelectComponent
        items={authors}
        title="Authors"
        selectClassName="filter-authors"
        handleChange={setSelectedAuthor}
      />
      <div className="col-8 col-sm-6 col-md-4 mb-3 filter mb-3 filter-price">
        <div className="row">
          <div className="col-6">
            <input
              className="form-control col-6"
              type="text"
              name="minPrice"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="min price"
              autoComplete="off"
            />
          </div>
          <div className="col-6">
            <input
              className="form-control col-6"
              type="text"
              name="maxPrice"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="max price"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div className="col-4 col-sm-6 col-md-2 mb-3">
        <button
          className="btn btn-outline-primary w-100"
          onClick={() => clearFilters()}
        >
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

export default Filters;
