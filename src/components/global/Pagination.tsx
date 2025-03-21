import { useEffect, useState } from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesPerGroup = 5;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const startPage =
      Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  useEffect(() => setCurrentPage(page), [page]);

  return (
    <div className="flex items-center gap-3">
      <button
        className="border p-2 rounded-lg bg-gray-200 active:opacity-80 w-14 disabled:opacity-100"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="flex gap-1">
        {getVisiblePages().map((page) => (
          <button
            className={`border p-2 rounded-lg w-10 hover:bg-primary hover:text-white active:opacity-80 ${
              currentPage === page ? "bg-primary text-white" : ""
            }`}
            key={page}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}

        {!getVisiblePages().includes(totalPages) && (
          <button
            className={`border p-2 rounded-lg hover:bg-primary hover:text-white active:opacity-80 ${
              currentPage === totalPages ? "bg-primary text-white" : ""
            }`}
            onClick={() => goToPage(totalPages)}
          >
            ...{totalPages}
          </button>
        )}
      </div>

      <button
        className="border p-2 rounded-lg bg-gray-200 active:opacity-80 w-14 disabled:opacity-100"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
