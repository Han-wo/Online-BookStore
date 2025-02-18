import { useBooks } from "@/hooks/useBooks";

import LoadingSpinner from "../common/LoadingSpinner";
import BookCard from "./BookCards";

interface BookGridProps {
  currentPage: number;
  keyword?: string;
}

export default function BookGrid({ currentPage, keyword }: BookGridProps) {
  const { data, isLoading } = useBooks(currentPage);
  const books = data?.books || [];

  // 필터링 로직 (검색어가 있으면 필터링)
  const filteredBooks = keyword
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(keyword.toLowerCase()) ||
          book.author.toLowerCase().includes(keyword.toLowerCase()),
      )
    : books;

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        <LoadingSpinner />
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-500">
          {keyword ? "검색 결과가 없습니다." : "등록된 책이 없습니다."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
