import { z } from "zod";

import bookSchema from "@/lib/validations/books";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt: string;
}

// zod 스키마의 output 타입을 사용
export type CreateBookInput = z.output<typeof bookSchema>;

export type UpdateBookInput = Partial<CreateBookInput>;

// zod 스키마의 input 타입을 사용 (form values)
export type BookFormValues = z.input<typeof bookSchema>;
