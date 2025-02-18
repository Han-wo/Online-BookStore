import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import bookAPI from "@/service/api/book";
import type { Book } from "@/types/book";

export const useBooks = (currentPage: number) =>
  useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => bookAPI.getBooks(currentPage, 10), // 페이지당 10개의 항목을 요청
    select: (data) => {
      // `total`과 `itemsPerPage`를 사용하여 totalPages 계산
      const totalPages = Math.ceil(data.total / 10); // 10개씩 페이지네이션
      return {
        ...data,
        totalPages, // 계산된 totalPages 추가
      };
    },
  });

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookAPI.deleteBook(id),
    onMutate: async (bookId) => {
      // 진행 중인 요청들 취소
      await queryClient.cancelQueries({ queryKey: ["books"] });

      // 이전 데이터 스냅샷 저장
      const previousBooks = queryClient.getQueryData<{ books: Book[] }>([
        "books",
      ]);

      // 낙관적으로 UI 업데이트
      queryClient.setQueryData<{ books: Book[] }>(["books"], (old) => {
        if (!old) return { books: [] };
        return {
          ...old,
          books: old.books.filter((book) => book.id !== bookId),
        };
      });

      return { previousBooks };
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousBooks) {
        queryClient.setQueryData(["books"], context.previousBooks);
      }
    },
    onSettled: () => {
      // 완료 후 데이터 리페치
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
