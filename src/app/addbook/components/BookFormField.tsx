import { FieldErrors, UseFormRegister } from "react-hook-form";

import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import { BookFormValues } from "@/types/book";

interface BookFormFieldsProps {
  register: UseFormRegister<BookFormValues>;
  errors: FieldErrors<BookFormValues>;
}

export default function BookFormFields({
  register,
  errors,
}: BookFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="도서명"
          placeholder="도서의 제목을 입력해주세요"
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          label="저자"
          placeholder="저자 이름을 입력해주세요"
          error={errors.author?.message}
          {...register("author")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="판매가"
          type="number"
          min="0"
          step="100"
          placeholder="판매 가격을 입력해주세요"
          unit="원"
          error={errors.price?.message}
          {...register("price")}
        />
        <Input
          label="수량"
          type="number"
          min="0"
          step="1"
          placeholder="수량을 입력해주세요"
          unit="권"
          error={errors.stock?.message}
          {...register("stock")}
        />
      </div>

      <TextArea
        label="도서 설명"
        placeholder="도서에 대한 상세한 설명을 입력해주세요"
        error={errors.description?.message}
        {...register("description")}
      />
    </div>
  );
}
