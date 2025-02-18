"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import bookSchema from "@/lib/validations/books";
import bookAPI from "@/service/api/book";
import type { BookFormValues } from "@/types/book";

interface BookFormProps {
  mode?: "create" | "edit";
  initialValues?: BookFormValues;
  bookId?: string;
}

export default function BookForm({
  mode = "create",
  initialValues,
  bookId,
}: BookFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialValues,
  });

  const createBook = (data: BookFormValues) =>
    bookAPI.createBook({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    });

  const updateBook = (data: BookFormValues) => {
    if (!bookId) throw new Error("Book ID is required for update");
    return bookAPI.updateBook(bookId, {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    });
  };

  const mutation = useMutation({
    mutationFn: mode === "edit" ? updateBook : createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      router.push("/");
    },
    onError: () => {
      const message =
        mode === "edit" ? "수정에 실패했습니다." : "등록에 실패했습니다.";
      alert(message);
    },
  });

  const onSubmit = (data: BookFormValues) => {
    mutation.mutate(data);
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) return "처리 중...";
    return mode === "edit" ? "수정하기" : "등록하기";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="제목"
        placeholder="제목을 입력해주세요"
        {...register("title")}
        error={errors.title?.message}
      />

      <Input
        label="저자"
        placeholder="저자를 입력해주세요"
        {...register("author")}
        error={errors.author?.message}
      />

      <TextArea
        label="설명"
        placeholder="설명을 입력해주세요"
        {...register("description")}
        error={errors.description?.message}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="가격"
          type="number"
          placeholder="가격을 입력해주세요"
          min="0"
          unit="원"
          {...register("price")}
          error={errors.price?.message}
        />

        <Input
          label="수량"
          type="number"
          placeholder="수량을 입력해주세요"
          min="0"
          unit="권"
          {...register("stock")}
          error={errors.stock?.message}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {getSubmitButtonText()}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
