import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      <Button
        type="button"
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === currentPage ? "default" : "secondary"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </div>
  );
}
