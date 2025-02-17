import type { Book } from "@/types/book";

import BookCard from "./BookCards";

interface BookGridProps {
  books: Book[];
  onRefresh: () => void;
}

export default function BookGrid({ books, onRefresh }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onRefresh={onRefresh} />
      ))}
    </div>
  );
}
