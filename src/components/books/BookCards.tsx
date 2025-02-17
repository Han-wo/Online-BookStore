"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { SlPencil } from "react-icons/sl";

import bookAPI from "@/service/api/book";
import type { Book } from "@/types/book";

import Button from "../common/Button";

interface BookCardProps {
  book: Book;
  onRefresh: () => void;
}

export default function BookCard({ book, onRefresh }: BookCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      setIsDeleting(true);
      await bookAPI.deleteBook(book.id);
      onRefresh();
    } catch (error) {
      alert("삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="shadow-sm rounded-lg border bg-white p-4">
      <h2 className="mb-10 text-20-500 font-bold">{book.title}</h2>
      <p className="mb-5 text-14-700 text-gray-800">저자: {book.author}</p>
      <div className="mb-4 line-clamp-2 min-h-30 text-14-500 text-gray-600">
        {book.description}
      </div>

      <div className="mb-10">
        <p className="mb-5 text-16-600">{book.price.toLocaleString()}원</p>
        <p className="text-14-500 text-gray-500">재고: {book.stock}권</p>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push(`/books/edit/${book.id}`)}
          className="flex items-center gap-1"
        >
          <SlPencil className="size-15" />
          수정
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-1 text-red-600 hover:bg-red-50"
        >
          <IoTrashOutline className="size-15" />
          삭제
        </Button>
      </div>
    </div>
  );
}
