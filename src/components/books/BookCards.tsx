/*eslint-disable */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { SlPencil } from "react-icons/sl";
import Image from "next/image";

import { useDeleteBook } from "@/hooks/useBooks";
import type { Book } from "@/types/book";

import Button from "../common/Button";
import BookDetail from "./BookDetailModal";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const router = useRouter();
  const deleteBook = useDeleteBook();
  const [showDetail, setShowDetail] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteBook.mutateAsync(book.id);
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <button
        type="button"
        className="shadow-sm hover:shadow-md w-full text-left rounded-lg border bg-white transition-shadow"
        onClick={() => setShowDetail(true)}
      >
        {book.imageUrl && (
          <div className="relative w-full h-200">
            <Image
              fill
              src={book.imageUrl}
              alt={book.title}
              className="object-cover rounded-t-lg"
            />
          </div>
        )}
        <div className="p-6">
          <h2 className="mb-10 text-18-500 font-bold">{book.title}</h2>
          <p className="mb-5 text-14-700 text-gray-800">저자: {book.author}</p>
          <div className="mb-4 line-clamp-2 min-h-30 text-14-500 text-gray-600">
            {book.description}
          </div>

          <div className="mb-10">
            <p className="mb-5 text-16-600">{book.price.toLocaleString()}원</p>
            <p className="text-14-500 text-gray-500">재고: {book.stock}권</p>
          </div>

          <div
            className="flex justify-end gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push(`/editbook/${book.id}`)}
              className="flex items-center gap-1"
            >
              <SlPencil className="size-15" />
              수정
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleDelete}
              disabled={deleteBook.isPending}
              className="flex items-center gap-1 text-red-600 hover:bg-red-50"
            >
              <IoTrashOutline className="size-15" />
              삭제
            </Button>
          </div>
        </div>
      </button>

      <BookDetail
        bookId={book.id}
        open={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}
