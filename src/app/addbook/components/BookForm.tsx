"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/Button";
import ImageUpload from "@/components/common/ImageUpload";
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
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (initialValues?.imageUrl) {
      setImageUrl(initialValues.imageUrl);
    }
  }, [initialValues]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn:
      mode === "edit" && bookId
        ? (data: BookFormValues) =>
            bookAPI.updateBook(bookId, {
              ...data,
              imageUrl,
              price: Number(data.price),
              stock: Number(data.stock),
            })
        : (data: BookFormValues) =>
            bookAPI.createBook({
              ...data,
              imageUrl,
              price: Number(data.price),
              stock: Number(data.stock),
            }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      router.push("/");
    },
    onError: () => {
      alert(mode === "edit" ? "수정에 실패했습니다." : "등록에 실패했습니다.");
    },
  });

  const onSubmit = (data: BookFormValues) => {
    mutation.mutate(data);
  };

  const getSubmitButtonText = () => {
    if (mutation.isPending) return "처리 중...";
    return mode === "edit" ? "수정하기" : "등록하기";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ImageUpload
        value={imageUrl}
        onChange={(url) => setImageUrl(url)}
        onRemove={() => setImageUrl("")}
      />

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
        <Button
          type="submit"
          disabled={isSubmitting || mutation.isPending || !isValid}
        >
          {getSubmitButtonText()}
        </Button>
        <Button
          type="button"
          disabled={isSubmitting || mutation.isPending}
          variant="secondary"
          onClick={() => router.back()}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
