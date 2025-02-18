"use client";

import { useQuery } from "@tanstack/react-query";

import BookForm from "@/app/addbook/components/BookForm";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import bookAPI from "@/service/api/book";
import type { BookFormValues } from "@/types/book";

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default function EditBookPage({ params }: EditBookPageProps) {
  const { data: book, isPending } = useQuery({
    queryKey: ["book", params.id],
    queryFn: () => bookAPI.getBookDetail(params.id),
  });

  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        <LoadingSpinner />
      </div>
    );
  }

  if (!book) return null;

  const initialValues: BookFormValues = {
    title: book.title,
    author: book.author,
    description: book.description,
    price: book.price,
    stock: book.stock,
    imageUrl: book.imageUrl,
  };

  return (
    <div className="container mx-auto px-10 py-20">
      <h1 className="mb-6 text-24-600">도서 수정</h1>
      <BookForm mode="edit" initialValues={initialValues} bookId={params.id} />
    </div>
  );
}
