import React from 'react';
import './Paginacion.css';

const Paginacion = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="paginacion-container">
      <button className="paginacion-btn" onClick={handlePrevious} disabled={currentPage === 1}>
        &laquo;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`paginacion-btn ${currentPage === i + 1 ? 'activo' : ''}`}
          onClick={() => handleClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button className="paginacion-btn" onClick={handleNext} disabled={currentPage === totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Paginacion;
