"use client";

import { useEffect, useState } from "react";

import Pagination from "@/components/common/PageNation";
import bookAPI from "@/service/api/book";
import type { Book } from "@/types/book";

import LoadingSpinner from "../common/LoadingSpinner";
import BookGrid from "./BookGrid";
import BookHeader from "./BookHeader";
import BookSearch from "./BookSearch";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async (page: number) => {
    try {
      setIsLoading(true);
      const data = await bookAPI.getBooks(page, 10);
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("책 불러오는중 오류:", error); //eslint-disable-line
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleSearch = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 클라이언트 사이드 검색
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(keyword.toLowerCase()) ||
      book.author.toLowerCase().includes(keyword.toLowerCase()),
  );
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <BookHeader />
      <BookSearch keyword={keyword} onSearch={handleSearch} className="mb-6" />
      <BookGrid
        books={filteredBooks}
        onRefresh={() => fetchBooks(currentPage)}
      />
      {filteredBooks.length > 0 && !keyword && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-10"
        />
      )}
    </div>
  );
}
