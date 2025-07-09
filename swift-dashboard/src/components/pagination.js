const Pagination = ({ totalItems, currentPage, pageSize, setCurrentPage, setPageSize }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
  
    const pageSizes = [10, 50, 100];
  
    return (
      <div>
        <label>Page Size:</label>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {pageSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
  
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    );
  };
  
  export default Pagination;
  