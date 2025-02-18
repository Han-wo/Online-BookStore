import type { Book, CreateBookInput, UpdateBookInput } from "@/types/book";

const bookAPI = {
  // 책 목록 조회
  getBooks: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    books: Book[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> => {
    try {
      const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error("도서목록 불러오기 실패");
      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "도서목록 불러오기 실패",
      );
    }
  },

  // 책 상세 조회
  getBookDetail: async (id: string): Promise<Book> => {
    try {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) throw new Error("도서 상세정보 불러오기 실패");
      return await response.json();
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "도서 상세정보 불러오기 실패",
      );
    }
  },

  // 책 생성
  createBook: async (data: CreateBookInput): Promise<Book> => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("도서 등록 실패");
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "도서등록 실패");
    }
  },

  // 책 수정
  updateBook: async (id: string, data: UpdateBookInput): Promise<Book> => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("도서수정 실패");
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "도서수정 실패");
    }
  },

  // 책 삭제
  deleteBook: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("도서삭제 실패");
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "도서삭제 실패");
    }
  },
};

export default bookAPI;
