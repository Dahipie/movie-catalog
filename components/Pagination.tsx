"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  // Показываем максимум 5 страниц на мобильных
  const getVisiblePages = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-wrap justify-center gap-1 md:gap-2 mt-4 md:mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition text-sm md:text-base"
      >
        ← Назад
      </button>
      
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm md:text-base"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-1 md:px-2 py-1">...</span>}
        </>
      )}
      
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg transition text-sm md:text-base ${
            currentPage === page 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
      
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-1 md:px-2 py-1">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm md:text-base"
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition text-sm md:text-base"
      >
        Вперёд →
      </button>
    </div>
  );
}