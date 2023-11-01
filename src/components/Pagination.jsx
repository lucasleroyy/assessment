import React from "react";

const Pagination = ({ nbPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nbPages + 1).keys()].slice(1);

  const handlePageChange = (pNum) => {
    setCurrentPage(pNum);
  };

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {pageNumbers.map((pNum) => (
          <li key={pNum} className={`page-item ${currentPage === pNum ? "active" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(pNum)}
            >
              {pNum}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
