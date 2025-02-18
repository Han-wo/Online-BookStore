import { useQuery } from "@tanstack/react-query";

import bookAPI from "@/service/api/book";

import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";

interface BookDetailProps {
  bookId: string;
  open: boolean;
  onClose: () => void;
}

export default function BookDetail({ bookId, open, onClose }: BookDetailProps) {
  const { data: book, isPending } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => bookAPI.getBookDetail(bookId),
    enabled: open,
  });

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="flex h-full items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    if (!book) {
      return (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">책 정보를 찾을 수 없습니다.</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex gap-30 px-10 py-20">
          <div>
            <h3 className="text-16-500 text-gray-700">저자</h3>
            <p className="mt-3">{book.author}</p>
          </div>

          <div>
            <h3 className="text-16-500 text-gray-700">가격</h3>
            <p className="mt-3 text-18-600 ">{book.price.toLocaleString()}원</p>
          </div>

          <div>
            <h3 className="text-16-500 text-gray-700">재고</h3>
            <p className="mt-3">{book.stock}권</p>
          </div>
        </div>
        <div className="px-10 py-20">
          <h3 className="text-16-500 text-gray-700">설명</h3>
          <p className="mt-3 whitespace-pre-line">{book.description}</p>
        </div>
      </>
    );
  };

  return (
    <Modal open={open} onClose={onClose} title={book?.title}>
      {renderContent()}
    </Modal>
  );
}
