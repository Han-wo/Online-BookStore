"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import bookSchema from "@/lib/validations/books";
import bookAPI from "@/service/api/book";
import type { BookFormValues } from "@/types/book";

export default function BookForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      await bookAPI.createBook({
        ...data,
        price: data.price,
        stock: data.stock,
      });

      router.push("/");
    } catch (error) {
      alert("책 등록에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="제목"
        {...register("title")}
        error={errors.title?.message}
      />

      <Input
        label="저자"
        {...register("author")}
        error={errors.author?.message}
      />

      <TextArea
        label="설명"
        {...register("description")}
        error={errors.description?.message}
      />

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="가격"
          type="number"
          min="0"
          unit="원"
          {...register("price")}
          error={errors.price?.message}
        />

        <Input
          label="수량"
          type="number"
          min="0"
          unit="권"
          {...register("stock")}
          error={errors.stock?.message}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? "등록 중..." : "등록하기"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
