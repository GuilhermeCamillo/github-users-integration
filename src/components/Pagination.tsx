import type { PaginationInfo } from "../types/github";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  if (totalPages <= 1 && page === 1) return null;

  const pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination" data-testid="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrev}
        className="pagination__button"
        aria-label="Página anterior"
      >
        Anterior
      </button>
      <div className="pagination__pages">
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="pagination__page"
            >
              1
            </button>
            {startPage > 2 && <span className="pagination__ellipsis">...</span>}
          </>
        )}
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`pagination__page ${
              pageNum === page ? "pagination__page--active" : ""
            }`}
            aria-label={`Página ${pageNum}`}
            aria-current={pageNum === page ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="pagination__ellipsis">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="pagination__page"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        className="pagination__button"
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </div>
  );
};
