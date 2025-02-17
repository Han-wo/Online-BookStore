import * as z from "zod";

const bookSchema = z.object({
  title: z
    .string({
      required_error: "제목을 입력해주세요",
    })
    .min(1, "제목을 입력해주세요"),
  author: z
    .string({
      required_error: "저자를 입력해주세요",
    })
    .min(1, "저자를 입력해주세요"),
  description: z
    .string({
      required_error: "설명을 입력해주세요",
    })
    .min(1, "설명을 입력해주세요"),
  stock: z.coerce
    .number({
      required_error: "수량을 입력해주세요",
    })
    .min(1, "수량을 입력해주세요"),

  price: z.coerce
    .number({
      required_error: "가격을 입력해주세요",
    })
    .min(1, "가격을 입력해주세요"),
});

export default bookSchema;
