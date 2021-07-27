import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ postPerPage, totalPost, paginate, currentPage, jumpToPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (e) => {
    if (e.target.value && !isNaN(e.target.value)) {
      paginate(parseInt(e.target.value));
    }
  };

  // const pagesToShow = pageNumbers.slice(currentPage - 1, currentPage + 4);

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            style={{ cursor: 'pointer' }}
            disabled={currentPage === 1 ? true : false}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''} `}>
            <span
              onClick={() => paginate(number)}
              className="page-link"
              style={{ cursor: 'pointer' }}
            >
              {number}
            </span>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            style={{ cursor: 'pointer' }}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
        {jumpToPage && (
          <li>
            <input
              className="form-control ml-2 page-link"
              style={{ width: 100 }}
              onChange={handlePageChange}
              placeholder="Page no..."
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propsTypes = {
  postPerPage: PropTypes.number.isRequired,
  totalPost: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  jumpToPage: PropTypes.bool,
};

export default Pagination;
