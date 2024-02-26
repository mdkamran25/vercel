interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
  }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <nav className="flex justify-center my-4 ">
        <ul className="flex space-x-2">
          <li>
            <button
              className={`${
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pages.map((page) => (
            <li key={page}>
              <button
                className={`${
                  currentPage === page ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`${
                currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
              }`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;