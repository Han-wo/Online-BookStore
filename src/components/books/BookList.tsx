"use client";

import { useState } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import Pagination from "@/components/common/PageNation";
import { useBooks } from "@/hooks/useBooks";

import BookGrid from "./BookGrid";
import BookHeader from "./BookHeader";
import BookSearch from "./BookSearch";

export default function BookList() {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data, isLoading } = useBooks(currentPage);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-50">
      <BookHeader />
      <BookSearch keyword={keyword} onSearch={handleSearch} className="mb-6" />
      <BookGrid currentPage={currentPage} keyword={keyword} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
        className="mt-10"
      />
    </div>
  );
}
